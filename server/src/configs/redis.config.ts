import Redis, { RedisOptions } from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const createRedisClient = (configService: ConfigService): Redis => {
  const redisConfig = new URL(configService.get<string>('REDIS_URL'));
  const redisOptions: RedisOptions = {
    host: redisConfig.hostname,
    port: Number(redisConfig.port),
    password: configService.get<string>('REDIS_PASSWORD'),
  };

  return new Redis(redisOptions);
};
