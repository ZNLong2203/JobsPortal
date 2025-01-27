import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model, Types } from 'mongoose';
import { Message } from 'src/common/message';
import { RedisService } from 'src/integrations/redis/redis.service';

@Injectable()
export class CompanyService {
  private readonly cacheVersionKey = 'company:version';
  private readonly companyCachePrefix = 'company:';
  private readonly allCompaniesCacheKey = 'company:all';

  constructor(
    private readonly redisService: RedisService,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  private getCacheKey(id: Types.ObjectId): string {
    return `${this.companyCachePrefix}${id}`;
  }

  private async getCacheVersion(): Promise<number> {
    return this.redisService.getCacheVersion(this.cacheVersionKey);
  }

  private async incrementCacheVersion(): Promise<void> {
    await this.redisService.incrementCacheVersion(this.cacheVersionKey);
  }

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    user: IReqUser,
  ): Promise<Company> {
    try {
      const createdCompany = await this.companyModel.create({
        ...createCompanyDto,
        createdBy: user._id,
      });

      await this.incrementCacheVersion();

      return createdCompany;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllCompany(page: number, limit: number, query: any): Promise<any> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.allCompaniesCacheKey}:${page}:${limit}:${cacheVersion}`;

      const cachedData = await this.redisService.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const skip = (page - 1) * limit;
      const [companies, total] = await Promise.all([
        this.companyModel.find(query).skip(skip).limit(limit).lean(),
        this.companyModel.countDocuments(query),
      ]);

      const result = {
        companies,
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
      throw new BadRequestException(error.message);
    }
  }

  async findOneCompany(id: Types.ObjectId): Promise<Company> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.getCacheKey(id)}:${cacheVersion}`;

      const cachedCompany = await this.redisService.get(cacheKey);
      if (cachedCompany) {
        return JSON.parse(cachedCompany);
      }

      const company = await this.companyModel.findById(id).lean();
      if (!company) {
        throw new BadRequestException('Company not found');
      }

      await this.redisService.set(
        cacheKey, 
        JSON.stringify(company),
        60 * 60 * 24,
      );

      return company;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTotalCompanies(): Promise<number> {
    try {
      const totalCompanies = await this.companyModel.countDocuments();
      return totalCompanies;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateCompany(
    id: Types.ObjectId,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    try {
      const updatedCompany = await this.companyModel
        .findByIdAndUpdate(id, updateCompanyDto, { new: true })
        .lean();

      await this.incrementCacheVersion();

      return updatedCompany;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeCompany(id: Types.ObjectId, user: IReqUser): Promise<void> {
    try {
      const checkCompany = await this.companyModel.findById(id);

      if (checkCompany.createdBy.toString() !== user._id) {
        throw new Error(Message.COMPANY_NOT_YOURS);
      }

      await this.companyModel.findByIdAndDelete(id);

      await this.incrementCacheVersion();

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
