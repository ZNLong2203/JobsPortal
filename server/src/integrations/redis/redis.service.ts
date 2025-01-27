import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { createRedisClient } from 'src/configs/redis.config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.redis = createRedisClient(this.configService);
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }

  async getCacheVersion(key: string): Promise<number> {
    const version = await this.redis.get(key);
    return version ? parseInt(version, 10) : 1;
  }

  async incrementCacheVersion(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.set(key, value, 'EX', ttl);
    } else {
      await this.redis.set(key, value);
    }
  }

  async incr(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
