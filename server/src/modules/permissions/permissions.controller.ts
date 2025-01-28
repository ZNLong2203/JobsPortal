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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Types } from 'mongoose';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { User } from 'src/decorators/user.decorator';
import { Message } from 'src/common/message';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: IReqUser,
  ) {
    const createPermission = await this.permissionsService.createPermission(
      createPermissionDto,
      user,
    );

    return {
      message: Message.PERMISSION_CREATED,
      data: createPermission,
    };
  }

  @Get()
  async findAllPermission(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    const currentPage = Math.max(Number(page) || 1, 1);
    const currentLimit = Math.max(Number(limit) || 10, 1);

    const { page: _, limit: __, ...filterQuery } = query;

    const allPermissions = await this.permissionsService.findAllPermission(
      currentPage,
      currentLimit,
      filterQuery,
    );

    return {
      message: Message.PERMISSION_ALL_FETCHED,
      data: allPermissions,
    };
  }

  @Get('/:id')
  async findOnePermission(@Param('id') id: Types.ObjectId) {
    const permission = await this.permissionsService.findOnePermission(id);
    return {
      message: Message.PERMISSION_FETCHED,
      data: permission,
    };
  }

  @Patch('/:id')
  async updatePermission(
    @Param('id') id: Types.ObjectId,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const updatedPermission = await this.permissionsService.updatePermission(
      id,
      updatePermissionDto,
    );

    return {
      message: Message.PERMISSION_UPDATED,
      data: updatedPermission,
    };
  }

  @Delete('/:id')
  async removePermission(@Param('id') id: Types.ObjectId) {
    await this.permissionsService.removePermission(id);
    return {
      message: Message.PERMISSION_DELETED,
    };
  }
}
