import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message } from 'src/common/message';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAllUser() {
    const allUsers = await this.usersService.findAllUser();
    return {
      message: Message.USER_ALL_FETCHED,
      data: allUsers,
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
