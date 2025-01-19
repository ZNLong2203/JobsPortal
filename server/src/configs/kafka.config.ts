import { ConfigService } from '@nestjs/config';

export const kafkaConfig = (configService: ConfigService) => {
  const brokers = configService.get<string>('KAFKA_BROKER');
  if (!brokers) {
    throw new Error('Kafka broker is not defined in environment variables');
  }

  return {
    clientId: configService.get<string>('KAFKA_CLIENT_ID') || 'default-client',
    brokers: brokers.split(','),
    groupId: configService.get<string>('KAFKA_GROUP_ID') || 'default-group',
  };
};
