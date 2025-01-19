import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@nestjs/config';
import { KafkaProducer } from './kafka.producer';
import { KafkaConsumer } from './kafka.consumer';

@Module({
  imports: [ConfigModule],
  providers: [KafkaService, KafkaProducer, KafkaConsumer],
  exports: [KafkaService, KafkaProducer, KafkaConsumer],
})
export class KafkaModule {}
