import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model } from 'mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto, user: IReqUser) {
    const createdCompany = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        gmail: user.gmail,
      },
    });

    return createdCompany;
  }

  async findAllCompany() {
    const allCompany = await this.companyModel.find();
    return allCompany;
  }

  async findOneCompany(id: number) {
    const company = await this.companyModel.findById(id);
    if (!company) throw new Error('Company not found');
    return company;
  }

  async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
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
  }

  async removeCompany(id: number, user: IReqUser) {
    const checkCompany = await this.companyModel.findById(id);

    if (checkCompany.createdBy._id.toString() !== user._id) {
      throw new Error('You are not authorized to delete this company');
    }

    await this.companyModel.findByIdAndDelete(id);

    return;
  }
}
