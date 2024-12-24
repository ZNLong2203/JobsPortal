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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Message } from 'src/common/message';
import { Types } from 'mongoose';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { User } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto, @User() user: IReqUser) {
    const newJob = this.jobsService.createJob(createJobDto, user);
    return {
      message: Message.JOB_CREATED,
      data: newJob,
    };
  }

  @Public()
  @Get()
  async findAllJob(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);

    const allJobs = await this.jobsService.findAllJob(
      currentPage,
      currentLimit,
      query,
    );

    return {
      message: Message.JOB_ALL_FETCHED,
      data: allJobs,
    };
  }

  @Public()
  @Get(':id')
  async findOneJob(@Param('id') id: Types.ObjectId) {
    const job = await this.jobsService.findOneJob(id);
    return {
      message: Message.JOB_FETCHED,
      data: job,
    };
  }

  @Patch(':id')
  async updateJob(
    @Param('id') id: Types.ObjectId,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    await this.jobsService.updateJob(id, updateJobDto);
    return {
      message: Message.JOB_UPDATED,
    };
  }

  @Delete(':id')
  async removeJob(@Param('id') id: Types.ObjectId, @User() user: IReqUser) {
    await this.jobsService.removeJob(id, user);
    return {
      message: Message.JOB_DELETED,
    };
  }
}
