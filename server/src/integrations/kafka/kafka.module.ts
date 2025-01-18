import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConfigService } from '@nestjs/config';
import { KafkaProducer } from './kafka.producer';

@Module({
  imports: [ConfigService],
  providers: [KafkaService, KafkaProducer, KafkaProducer],
  exports: [KafkaService],
})
export class KafkaModule {}
