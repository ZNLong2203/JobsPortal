import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { kafkaConfig } from '../../configs/kafka.config';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(private readonly configService: ConfigService) {
    const config = kafkaConfig(this.configService);
    this.kafka = new Kafka(config);
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: config.groupId });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    let attempts = 3;
    while (attempts > 0) {
      try {
        await this.producer.connect();
        await this.consumer.connect();
        console.log('KafkaService: Connected to Kafka');
        break;
      } catch (error) {
        attempts--;
        console.error(
          `KafkaService: Connection failed. Retries left: ${attempts}`,
          error,
        );
        if (attempts === 0) throw error;
      }
    }
  }

  private async disconnect() {
    try {
      await this.producer.disconnect();
      await this.consumer.disconnect();
      console.log('KafkaService: Disconnected from Kafka');
    } catch (error) {
      console.error('KafkaService: Failed to disconnect', error);
    }
  }

  getKafka() {
    return this.kafka;
  }

  getProducer() {
    return this.producer;
  }

  getConsumerGroupId() {
    return kafkaConfig(this.configService).groupId;
  }
}
