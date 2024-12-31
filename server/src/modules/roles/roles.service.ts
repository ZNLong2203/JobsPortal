import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { IReqUser } from '../auth/interfaces/req-user.interface';
import { Message } from 'src/common/message';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(
    createRoleDto: CreateRoleDto,
    user: IReqUser,
  ): Promise<Role> {
    try {
      const newRole = await this.roleModel.create({
        ...createRoleDto,
        createdBy: user._id,
      });

      return newRole;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllRole(page: number, limit: number, query: any): Promise<any> {
    try {
      const skip = (page - 1) * limit;
      const [roles, totalDocuments] = await Promise.all([
        this.roleModel
          .find(query)
          .skip(skip)
          .limit(limit)
          .populate('permissions'),
        this.roleModel.countDocuments(query).populate('permissions'),
      ]);

      const totalPages = Math.ceil(totalDocuments / limit);

      return {
        roles,
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

  async findOneRole(id: Types.ObjectId): Promise<Role> {
    try {
      const role = await this.roleModel.findById(id).populate('permissions');
      if (!role) throw new NotFoundException(Message.ROLE_NOT_FOUND);

      return role;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateRole(
    id: Types.ObjectId,
    updateRoleDto: UpdateRoleDto,
  ): Promise<void> {
    try {
      await this.roleModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          ...updateRoleDto,
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

  async removeRole(id: Types.ObjectId): Promise<void> {
    try {
      await this.roleModel.findByIdAndDelete(id);

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
