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
import ResponseDto from 'src/constants/response.dto';

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
    return ResponseDto.success(allUsers, 'All users fetched successfully');
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = this.usersService.findUserById(+id);
    return ResponseDto.success(user, 'User fetched successfully');
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = this.usersService.updateUser(+id, updateUserDto);
    return ResponseDto.success(updatedUser, 'User updated successfully');
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(+id);
    return ResponseDto.successWithoutData('User deleted successfully');
  }
}
