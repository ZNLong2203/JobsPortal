import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Message } from 'src/common/message';
import { Roles } from 'src/decorators/role.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/admin')
  @Roles('admin')
  async getAdminStatistics() {
    const statistics = await this.statisticsService.getAdminStatistics();

    return {
      message: Message.STATISTICS_ADMIN_FETCHED,
      data: statistics,
    };
  }
}
