import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { User } from 'src/decorators/user.decorator';
import { Message } from 'src/common/message';

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

  @Get()
  async findAllCompany() {
    const allCompany = await this.companyService.findAllCompany();
    return {
      message: Message.COMPANY_ALL_FETCHED,
      data: allCompany,
    };
  }

  @Get(':id')
  async findOneCompany(@Param('id') id: string) {
    const company = await this.companyService.findOneCompany(+id);
    return {
      message: Message.COMPANY_FETCHED,
      data: company,
    };
  }

  @Patch(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    await this.companyService.updateCompany(+id, updateCompanyDto);
    return {
      message: Message.COMPANY_UPDATED,
    };
  }

  @Delete(':id')
  async removeCompany(@Param('id') id: string, @User() user: IReqUser) {
    await this.companyService.removeCompany(+id, user);
    return {
      message: Message.COMPANY_DELETED,
    };
  }
}
