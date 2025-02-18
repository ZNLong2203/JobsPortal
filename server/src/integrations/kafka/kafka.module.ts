import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@nestjs/config';
import { KafkaProducer } from './kafka.producer';

@Module({
  imports: [ConfigModule],
  providers: [KafkaService, KafkaProducer],
  exports: [KafkaService, KafkaProducer],
})
export class KafkaModule {}
