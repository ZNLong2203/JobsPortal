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

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    user: IReqUser,
  ): Promise<Company> {
    try {
      const createdCompany = await this.companyModel.create({
        ...createCompanyDto,
        createdBy: user._id,
      });

      return createdCompany;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllCompany(page: number, limit: number, query: any): Promise<any> {
    try {
      const skip = (page - 1) * limit;
      const [companies, totalDocuments] = await Promise.all([
        this.companyModel.find(query).skip(skip).limit(limit),
        this.companyModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalDocuments / limit);

      return {
        companies,
        metadata: {
          total: totalDocuments,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneCompany(id: Types.ObjectId): Promise<Company> {
    try {
      const company = await this.companyModel.findById(id);
      if (!company) throw new Error(Message.COMPANY_NOT_FOUND);

      return company;
    } catch (error) {
      throw new NotFoundException(error.message);
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
  ): Promise<void> {
    try {
      await this.companyModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          ...updateCompanyDto,
        },
        {
          new: true,
        },
      );

      return;
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

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
