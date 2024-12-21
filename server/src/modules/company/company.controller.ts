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
import ResponseDto from 'src/constants/response.dto';

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
    return ResponseDto.success(createdCompany, 'Company created successfully');
  }

  @Get()
  async findAllCompany() {
    const allCompany = await this.companyService.findAllCompany();
    return ResponseDto.success(allCompany, 'All company fetched successfully');
  }

  @Get(':id')
  async findOneCompany(@Param('id') id: string) {
    const company = await this.companyService.findOneCompany(+id);
    return ResponseDto.success(company, 'Company fetched successfully');
  }

  @Patch(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    await this.companyService.updateCompany(+id, updateCompanyDto);
    return ResponseDto.successWithoutData('Company updated successfully');
  }

  @Delete(':id')
  async removeCompany(@Param('id') id: string, @User() user: IReqUser) {
    await this.companyService.removeCompany(+id, user);
    return ResponseDto.successWithoutData('Company deleted successfully');
  }
}
