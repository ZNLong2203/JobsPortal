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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAllUser() {
    const allUsers = this.usersService.findAllUser();
    return {
      message: Message.FETCH_ALL_USER_SUCCESS,
      data: allUsers,
    };
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = this.usersService.findUserById(+id);
    return {
      message: Message.FETCH_USER_SUCCESS,
      data: user,
    };
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = this.usersService.updateUser(+id, updateUserDto);
    return {
      message: Message.UPDATE_USER_SUCCESS,
      data: updatedUser,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(+id);
    return {
      message: Message.DELETE_USER_SUCCESS,
    };
  }
}
