import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { Model, Types } from 'mongoose';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { Message } from 'src/common/message';
import { RedisService } from 'src/integrations/redis/redis.service';

@Injectable()
export class JobsService {
  private readonly cacheVersionKey = 'job:version';
  private readonly jobCachePrefix = 'job:';
  private readonly allJobsCacheKey = 'job:all';

  constructor(
    private readonly redisService: RedisService,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
  ) {}

  private getCacheKey(id: Types.ObjectId): string {
    return `${this.jobCachePrefix}${id}`;
  }

  async getCacheVersion(): Promise<number> {
    return this.redisService.getCacheVersion(this.cacheVersionKey);
  }

  async incrementCacheVersion(): Promise<void> {
    await this.redisService.incrementCacheVersion(this.cacheVersionKey);
  }

  async createJob(createJobDto: CreateJobDto, user: IReqUser): Promise<Job> {
    try {
      const newJob = await this.jobModel.create({
        ...createJobDto,
        createdBy: user._id,
      });

      await this.incrementCacheVersion();

      return newJob;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllJob(page: number, limit: number, query: any): Promise<any> {
    try {
      const queryBuilder: any = {};
      const queryParams = query.query || query;

      if (queryParams?.search) {
        queryBuilder.title = { $regex: queryParams.search, $options: 'i' };
      }
      if (queryParams?.location) {
        queryBuilder.location = { $regex: queryParams.location, $options: 'i' };
      }
      if (queryParams?.type && queryParams?.type !== 'all') {
        queryBuilder.type = queryParams.type;
      }
      if (queryParams?.level && queryParams?.level !== 'all') {
        queryBuilder.level = queryParams.level;
      }
      if (queryParams?.company) {
        queryBuilder.company = queryParams.company;
      }

      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.allJobsCacheKey}:${page}:${limit}:${JSON.stringify(queryBuilder)}:${cacheVersion}`;

      const cacheData = await this.redisService.get(cacheKey);
      if (cacheData) {
        return JSON.parse(cacheData);
      }

      const skip = (page - 1) * limit;
      const [jobs, total] = await Promise.all([
        this.jobModel
          .find(queryBuilder)
          .skip(skip)
          .limit(limit)
          .populate('company')
          .sort({ createdAt: -1 })
          .lean(),
        this.jobModel.countDocuments(queryBuilder),
      ]);

      const result = {
        jobs,
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

  async findOneJob(id: Types.ObjectId): Promise<Job> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.getCacheKey(id)}:${cacheVersion}`;

      const cachedJob = await this.redisService.get(cacheKey);
      if (cachedJob) {
        return JSON.parse(cachedJob);
      }

      const job = await this.jobModel.findById(id).populate('company').lean();
      if (!job) throw new BadRequestException(Message.JOB_NOT_FOUND);

      await this.redisService.set(cacheKey, JSON.stringify(job), 60 * 60 * 24);

      return job;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getTotalJobs(query?: string): Promise<number> {
    try {
      const queryData = query
        ? { title: { $regex: query, $options: 'i' } }
        : {};
      const totalJobs = await this.jobModel.countDocuments(queryData);
      return totalJobs;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getJobsAppliedByMonth(): Promise<any> {
    try {
      const jobsAppliedByMonth = await this.jobModel.aggregate([
        {
          $addFields: {
            createdAt: { $toDate: '$createdAt' },
          },
        },
        {
          $match: {
            createdAt: { $exists: true },
          },
        },
        {
          $project: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: { year: '$year', month: '$month' },
            total: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      const jobsAppliedByMonthFormatted = jobsAppliedByMonth.map((item) => ({
        year: item._id.year,
        month: item._id.month,
        total: item.total,
      }));

      return jobsAppliedByMonthFormatted;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getJobsDistributionByCategory(): Promise<any> {
    try {
      const jobsDistributionByCategory = await this.jobModel.aggregate([
        {
          $group: {
            _id: '$category',
            total: { $sum: 1 },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]);

      return jobsDistributionByCategory;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateJob(
    id: Types.ObjectId,
    updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    try {
      const existingJob = await this.jobModel.findById(id);
      if (!existingJob) {
        throw new BadRequestException(Message.JOB_NOT_FOUND);
      }

      if (updateJobDto.company.toString() !== existingJob.company.toString()) {
        updateJobDto.company = (updateJobDto.company as any)._id || updateJobDto.company;
      }

      const updatedJob = await this.jobModel
        .findByIdAndUpdate(id, updateJobDto, { new: true })
        .populate('company')
        .lean();

      await this.incrementCacheVersion();

      return updatedJob;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeJob(id: Types.ObjectId, user: IReqUser): Promise<void> {
    try {
      const checkJob = await this.jobModel.findById(id);

      if (checkJob.createdBy.toString() !== user._id.toString()) {
        throw new BadRequestException(Message.JOB_NOT_YOURS);
      }

      await this.jobModel.findByIdAndDelete(id);

      await this.incrementCacheVersion();

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
