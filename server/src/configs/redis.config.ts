import Redis, { RedisOptions } from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const createRedisClient = (configService: ConfigService): Redis => {
  const redisOptions: RedisOptions = {
    host: configService.get<string>('REDIS_HOST', 'localhost'),
    port: configService.get<number>('REDIS_PORT', 6379),
    password: configService.get<string>('REDIS_PASSWORD'),
  };

  return new Redis(redisOptions);
};
