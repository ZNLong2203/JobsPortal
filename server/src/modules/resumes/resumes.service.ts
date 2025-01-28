import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { RedisService } from 'src/integrations/redis/redis.service';

@Injectable()
export class ResumesService {
  private readonly cacheVersionKey = 'resume:version';
  private readonly resumeCachePrefix = 'resume:';
  private readonly allResumesCacheKey = 'resume:all';

  constructor(
    private readonly redisService: RedisService,
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
  ) {}

  private getCacheKey(id: Types.ObjectId): string {
    return `${this.resumeCachePrefix}${id}`;
  }

  private async getCacheVersion(): Promise<number> {
    return this.redisService.getCacheVersion(this.cacheVersionKey);
  }

  private async incrementCacheVersion(): Promise<void> {
    await this.redisService.incrementCacheVersion(this.cacheVersionKey);
  }

  async createResume(
    createResumeDto: CreateResumeDto,
    user: IReqUser,
  ): Promise<Resume> {
    try {
      const newResume = await this.resumeModel.create({
        ...createResumeDto,
        createdBy: user._id,
      });

      await this.incrementCacheVersion();

      return newResume;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllResume(page: number, limit: number, query: any): Promise<any> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.allResumesCacheKey}:${page}:${limit}:${cacheVersion}`;

      const cacheData = await this.redisService.get(cacheKey);
      if (cacheData) {
        return JSON.parse(cacheData);
      }

      const skip = (page - 1) * limit;
      const [resumes, total] = await Promise.all([
        this.resumeModel
          .find(query)
          .skip(skip)
          .limit(limit)
          .populate('user', '-password')
          .populate('company')
          .populate('job')
          .sort({ createdAt: -1 })
          .lean(),
        this.resumeModel
          .countDocuments(query)
          .populate('user', '-password')
          .populate('company')
          .populate('job'),
      ]);

      const result = {
        resumes,
        metadata: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      await this.redisService.set(
        cacheKey,
        JSON.stringify(result),
        60 * 60 * 24,
      );

      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAllResumeByUser(
    page: number,
    limit: number,
    user: IReqUser,
  ): Promise<any> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.allResumesCacheKey}:${user._id}:${page}:${limit}:${cacheVersion}`;

      const cacheData = await this.redisService.get(cacheKey);
      if (cacheData) {
        return JSON.parse(cacheData);
      }

      const skip = (page - 1) * limit;
      const [resumes, total] = await Promise.all([
        this.resumeModel
          .find({
            createdBy: user._id,
          })
          .skip(skip)
          .limit(limit)
          .populate('user', '-password')
          .populate('company')
          .populate('job')
          .sort({ createdAt: -1 })
          .lean(),
        this.resumeModel
          .countDocuments({
            createdBy: user._id,
          })
          .populate('user', '-password')
          .populate('company')
          .populate('job'),
      ]);

      const result = {
        resumes,
        metadata: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      await this.redisService.set(
        cacheKey,
        JSON.stringify(result),
        60 * 60 * 24,
      );

      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneResume(id: Types.ObjectId): Promise<Resume> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.getCacheKey(id)}:${cacheVersion}`;

      const cachedResume = await this.redisService.get(cacheKey);
      if (cachedResume) {
        return JSON.parse(cachedResume);
      }

      const resume = await this.resumeModel
        .findById(id)
        .populate('user', '-password')
        .populate('company')
        .populate('job')
        .lean();
      if (!resume) throw new NotFoundException('Resume not found');

      await this.redisService.set(
        cacheKey,
        JSON.stringify(resume),
        60 * 60 * 24,
      );

      return resume;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getTotalResumes(query?: string): Promise<number> {
    try {
      const queryData = query
        ? { title: { $regex: query, $options: 'i' } }
        : {};
      const totalResumes = await this.resumeModel.countDocuments(queryData);
      return totalResumes;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getResumeStatusByMonth(query?: string): Promise<any> {
    try {
      const queryData = query
        ? { title: { $regex: query, $options: 'i' } }
        : {};
      const resumes = await this.resumeModel.aggregate([
        {
          $match: queryData,
        },
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' },
            },
            total: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
      ]);

      return resumes;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateResume(
    id: Types.ObjectId,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    try {
      const updatedResume = await this.resumeModel
        .findByIdAndUpdate(id, updateResumeDto, { new: true })
        .lean();

      if (!updatedResume) throw new NotFoundException('Resume not found');

      await this.incrementCacheVersion();

      return updatedResume;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateResumeStatus(
    id: Types.ObjectId,
    status: string,
    user: IReqUser,
  ): Promise<void> {
    try {
      const updatedResume = await this.resumeModel.updateOne(
        {
          _id: id,
        },
        {
          $push: {
            history: {
              status,
              updateAt: new Date(),
              updatedBy: user._id,
            },
          },
        },
      );

      if (!updatedResume) throw new NotFoundException('Resume not found');

      await this.incrementCacheVersion();

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeResume(id: Types.ObjectId, user: IReqUser): Promise<void> {
    try {
      const checkResume = await this.resumeModel.findById(id);
      if (!checkResume) throw new NotFoundException('Resume not found');

      if (checkResume.createdBy.toString() !== user._id.toString()) {
        throw new BadRequestException('Resume not yours');
      }

      await this.resumeModel.findByIdAndDelete(id);

      await this.incrementCacheVersion();

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
