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
import { RedisService } from 'src/integrations/redis/redis.service';

@Injectable()
export class RolesService {
  private readonly cacheVersionKey = 'role:version';
  private readonly roleCachePrefix = 'role:';
  private readonly allRolesCacheKey = 'role:all';

  constructor(
    private readonly redisService: RedisService,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  private getCacheKey(id: Types.ObjectId): string {
    return `${this.roleCachePrefix}${id}`;
  }

  private async getCacheVersion(): Promise<number> {
    return this.redisService.getCacheVersion(this.cacheVersionKey);
  }

  private async incrementCacheVersion(): Promise<void> {
    await this.redisService.incrementCacheVersion(this.cacheVersionKey);
  }

  async createRole(
    createRoleDto: CreateRoleDto,
    user: IReqUser,
  ): Promise<Role> {
    try {
      const newRole = await this.roleModel.create({
        ...createRoleDto,
        createdBy: user._id,
      });

      await this.incrementCacheVersion();

      return newRole;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllRole(page: number, limit: number, query: any): Promise<any> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.allRolesCacheKey}:${page}:${limit}:${cacheVersion}`;

      const cacheData = await this.redisService.get(cacheKey);
      if (cacheData) {
        return JSON.parse(cacheData);
      }

      const skip = (page - 1) * limit;
      const [roles, total] = await Promise.all([
        this.roleModel
          .find(query)
          .skip(skip)
          .limit(limit)
          .populate('permissions')
          .lean(),
        this.roleModel.countDocuments(query).populate('permissions'),
      ]);

      const result = {
        roles,
        metadata: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      await this.redisService.set(
        cacheKey,
        JSON.stringify(result),
        60 * 60 * 24,
      );

      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneRole(id: Types.ObjectId): Promise<Role> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.getCacheKey(id)}:${cacheVersion}`;

      const cachedRole = await this.redisService.get(cacheKey);
      if (cachedRole) {
        return JSON.parse(cachedRole);
      }

      const role = await this.roleModel.findById(id).populate('permissions').lean();
      if (!role) throw new NotFoundException(Message.ROLE_NOT_FOUND);

      await this.redisService.set(
        cacheKey,
        JSON.stringify(role),
        60 * 60 * 24,
      );

      return role;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateRole(
    id: Types.ObjectId,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    try {
      const updatedRole = await this.roleModel
        .findByIdAndUpdate(id, updateRoleDto, { new: true })
        .lean();

      await this.incrementCacheVersion();

      return updatedRole;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeRole(id: Types.ObjectId): Promise<void> {
    try {
      await this.roleModel.findByIdAndDelete(id);

      await this.incrementCacheVersion();

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
