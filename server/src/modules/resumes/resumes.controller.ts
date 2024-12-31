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
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Types } from 'mongoose';
import { User } from 'src/decorators/user.decorator';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { Message } from 'src/common/message';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  async createResume(
    @Body() createResumeDto: CreateResumeDto,
    @User() user: IReqUser,
  ) {
    const newResume = await this.resumesService.createResume(
      createResumeDto,
      user,
    );

    return {
      message: Message.RESUME_CREATED,
      data: newResume,
    };
  }

  @Get()
  async findAllResume(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);

    const allResumes = await this.resumesService.findAllResume(
      currentPage,
      currentLimit,
      query,
    );

    return {
      message: Message.RESUME_ALL_FETCHED,
      data: allResumes,
    };
  }

  @Get('/:id')
  async findOneResume(@Param('id') id: Types.ObjectId) {
    const resume = await this.resumesService.findOneResume(id);
    return {
      message: Message.RESUME_FETCHED,
      data: resume,
    };
  }

  @Patch('/:id')
  async updateResume(
    @Param('id') id: Types.ObjectId,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    await this.resumesService.updateResume(id, updateResumeDto);
    return {
      message: Message.RESUME_UPDATED,
    };
  }

  @Patch('/:id/status')
  async updateResumeStatus(
    @Param('id') id: Types.ObjectId,
    @Body('status') status: string,
    @User() user: IReqUser,
  ) {
    await this.resumesService.updateResumeStatus(id, status, user);
    return {
      message: Message.RESUME_STATUS_UPDATED,
    };
  }

  @Delete('/:id')
  async removeResume(@Param('id') id: Types.ObjectId, @User() user: IReqUser) {
    await this.resumesService.removeResume(id, user);
    return {
      message: Message.RESUME_DELETED,
    };
  }
}
