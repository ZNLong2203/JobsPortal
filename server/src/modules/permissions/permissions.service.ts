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
import { RedisService } from 'src/integrations/redis/redis.service';

@Injectable()
export class PermissionsService {
  private readonly cacheVersionKey = 'permission:version';
  private readonly permissionCachePrefix = 'permission:';
  private readonly allPermissionsCacheKey = 'permission:all';

  constructor(
    private readonly redisService: RedisService,
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {}

  private getCacheKey(id: Types.ObjectId): string {
    return `${this.permissionCachePrefix}${id}`;
  }

  private async getCacheVersion(): Promise<number> {
    return this.redisService.getCacheVersion(this.cacheVersionKey);
  }

  private async incrementCacheVersion(): Promise<void> {
    await this.redisService.incrementCacheVersion(this.cacheVersionKey);
  }

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

      await this.incrementCacheVersion();

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
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.allPermissionsCacheKey}:${page}:${limit}:${cacheVersion}`;

      const cachedData = await this.redisService.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const skip = (page - 1) * limit;
      const [permissions, total] = await Promise.all([
        this.permissionModel.find(query).skip(skip).limit(limit).lean(),
        this.permissionModel.countDocuments(query),
      ]);

      const result = {
        permissions,
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

  async findOnePermission(id: Types.ObjectId): Promise<Permission> {
    try {
      const cacheVersion = await this.getCacheVersion();
      const cacheKey = `${this.getCacheKey(id)}:${cacheVersion}`;

      const cachedPermission = await this.redisService.get(cacheKey);
      if (cachedPermission) {
        return JSON.parse(cachedPermission);
      }

      const permission = await this.permissionModel.findById(id);

      if (!permission) {
        throw new BadRequestException(Message.PERMISSION_NOT_FOUND);
      }

      await this.redisService.set(
        cacheKey, 
        JSON.stringify(permission),
        60 * 60 * 24,
      );

      return permission;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updatePermission(
    id: Types.ObjectId,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    try {
      const updatedPermission = await this.permissionModel
        .findByIdAndUpdate(id, updatePermissionDto, { new: true })
        .lean();
      
      await this.incrementCacheVersion();

      return updatedPermission;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removePermission(id: Types.ObjectId): Promise<void> {
    try {
      await this.permissionModel.findByIdAndDelete(id);

      await this.incrementCacheVersion();

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
