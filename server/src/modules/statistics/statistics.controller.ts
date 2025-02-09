import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Message } from 'src/common/message';
import { Roles } from 'src/decorators/role.decorator';
import { User } from 'src/decorators/user.decorator';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { ApiTags } from '@nestjs/swagger';
import { DeclareRole } from 'src/common/constants';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/admin')
  @Roles(DeclareRole.Admin)
  async getAdminStatistics() {
    const statistics = await this.statisticsService.getAdminStatistics();

    return {
      message: Message.STATISTICS_ADMIN_FETCHED,
      data: statistics,
    };
  }

  @Get('/company')
  @Roles(DeclareRole.CompanyAdmin)
  async getCompanyStatistics(@User() user: IReqUser) {
    const statistics = await this.statisticsService.getCompanyStatistics(user);

    return {
      message: Message.STATISTICS_COMPANY_FETCHED,
      data: statistics,
    };
  }
}
