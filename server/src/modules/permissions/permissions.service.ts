import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { Model, Types } from 'mongoose';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { Message } from 'src/common/message';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionDto,
    user: IReqUser,
  ): Promise<Permission> {
    try {
      const checkExistsPermission = await this.permissionModel.findOne({
        apiPath: createPermissionDto.apiPath,
        method: createPermissionDto.method,
      });

      if (checkExistsPermission) {
        throw new BadRequestException(Message.PERMISSION_ALREADY_EXISTS);
      }

      const newPermission = await this.permissionModel.create({
        ...createPermissionDto,
        createdBy: user._id,
      });

      return newPermission;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllPermission(
    page: number,
    limit: number,
    query: any,
  ): Promise<any> {
    try {
      const skip = (page - 1) * limit;
      const [permissions, totalDocuments] = await Promise.all([
        this.permissionModel.find(query).skip(skip).limit(limit),
        this.permissionModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalDocuments / limit);

      return {
        permissions,
        metadata: {
          total: totalDocuments,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOnePermission(id: Types.ObjectId): Promise<Permission> {
    try {
      const permission = await this.permissionModel.findById(id);

      if (!permission) {
        throw new BadRequestException(Message.PERMISSION_NOT_FOUND);
      }

      return permission;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updatePermission(
    id: Types.ObjectId,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<void> {
    try {
      await this.permissionModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          ...updatePermissionDto,
        },
        {
          new: true,
        },
      );

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removePermission(id: Types.ObjectId): Promise<void> {
    try {
      await this.permissionModel.findByIdAndDelete(id);
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
