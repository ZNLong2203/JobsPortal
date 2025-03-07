import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { User } from 'src/decorators/user.decorator';
import { Message } from 'src/common/message';
import { Types } from 'mongoose';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @User() user: IReqUser,
  ) {
    const createdCompany = await this.companyService.createCompany(
      createCompanyDto,
      user,
    );
    return {
      message: Message.COMPANY_CREATED,
      data: createdCompany,
    };
  }

  @Public()
  @Get()
  async findAllCompany(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);

    const { page: _, limit: __, ...filterQuery } = query;

    const allCompany = await this.companyService.findAllCompany(
      currentPage,
      currentLimit,
      filterQuery,
    );

    return {
      message: Message.COMPANY_ALL_FETCHED,
      data: allCompany,
    };
  }

  @Public()
  @Get('/:id')
  async findOneCompany(@Param('id') id: Types.ObjectId) {
    const company = await this.companyService.findOneCompany(id);
    return {
      message: Message.COMPANY_FETCHED,
      data: company,
    };
  }

  @Patch('/:id')
  async updateCompany(
    @Param('id') id: Types.ObjectId,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    await this.companyService.updateCompany(id, updateCompanyDto);
    return {
      message: Message.COMPANY_UPDATED,
    };
  }

  @Delete('/:id')
  async removeCompany(@Param('id') id: Types.ObjectId, @User() user: IReqUser) {
    await this.companyService.removeCompany(id, user);
    return {
      message: Message.COMPANY_DELETED,
    };
  }
}
