import { ConfigService } from "@nestjs/config";

export const kafkaConfig = (configService: ConfigService) => ({
  clientId: configService.get('KAFKA_CLIENT_ID'),
  brokers: [configService.get('KAFKA_BROKER')],
})