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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message } from 'src/common/message';
import { Types } from 'mongoose';
import { User } from 'src/decorators/user.decorator';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { ResumesService } from '../resumes/resumes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly resumesService: ResumesService,
  ) {}

  @Post()
  async createUserByAdmin(
    @Body() createUserDto: CreateUserDto,
    @User() user: IReqUser,
  ) {
    return await this.usersService.createUserByAdmin(createUserDto, user);
  }

  @Get()
  async findAllUser(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);

    const allUsers = await this.usersService.findAllUser(
      currentPage,
      currentLimit,
      query,
    );

    return {
      message: Message.USER_ALL_FETCHED,
      data: allUsers,
    };
  }

  @Get('/:id/resumes')
  async findAllResumesByUser(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @User() user: IReqUser,
  ) {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);

    const allResumes = await this.resumesService.findAllResumeByUser(
      currentPage,
      currentLimit,
      user,
    );

    return {
      message: Message.RESUME_ALL_FETCHED,
      data: allResumes,
    };
  }

  @Get('/:id')
  async findUserById(@Param('id') id: Types.ObjectId) {
    const user = await this.usersService.findUserById(id);
    return {
      message: Message.USER_FETCHED,
      data: user,
    };
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
    return {
      message: Message.USER_UPDATED,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: Types.ObjectId) {
    await this.usersService.deleteUser(id);
    return {
      message: Message.USER_DELETED,
    };
  }
}
