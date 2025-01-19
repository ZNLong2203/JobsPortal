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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Types } from 'mongoose';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { User } from 'src/decorators/user.decorator';
import { Message } from 'src/common/message';
import { Roles } from 'src/decorators/role.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('admin')
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
    @User() user: IReqUser,
  ) {
    const newRole = await this.rolesService.createRole(createRoleDto, user);

    return {
      message: Message.ROLE_CREATED,
      data: newRole,
    };
  }

  @Get()
  @Roles('admin')
  async findAllRole(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);

    const { page: _, limit: __, ...filterQuery } = query;

    const allRoles = await this.rolesService.findAllRole(
      currentPage,
      currentLimit,
      filterQuery,
    );

    return {
      message: Message.ROLE_ALL_FETCHED,
      data: allRoles,
    };
  }

  @Get('/:id')
  @Roles('admin')
  async findOneRole(@Param('id') id: Types.ObjectId) {
    const role = await this.rolesService.findOneRole(id);
    return {
      message: Message.ROLE_FETCHED,
      data: role,
    };
  }

  @Patch('/:id')
  @Roles('admin')
  async updateRole(
    @Param('id') id: Types.ObjectId,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    await this.rolesService.updateRole(id, updateRoleDto);
    return {
      message: Message.ROLE_UPDATED,
    };
  }

  @Delete('/:id')
  @Roles('admin')
  async removeRole(@Param('id') id: Types.ObjectId) {
    await this.rolesService.removeRole(id);
    return {
      message: Message.ROLE_DELETED,
    };
  }
}
