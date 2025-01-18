import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { kafkaConfig } from '../../configs/kafka.config';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka(kafkaConfig(configService));
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: configService.get('KAFKA_GROUP_ID') });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      await this.producer.connect();
      await this.consumer.connect();
      console.log('KafkaService: Connected to Kafka');
    } catch (error) {
      console.error('KafkaService: Failed to connect', error);
      throw error;
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

  async produce(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      console.error(`KafkaService: Failed to produce message to ${topic}`, error);
      throw error;
    }
  }

  async consume(topic: string, callback: (message: any) => Promise<void>) {
    try {
      await this.consumer.subscribe({ topic });
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          const value = message.value?.toString();
          if (value) {
            await callback(JSON.parse(value));
          }
        },
      });
    } catch (error) {
      console.error(`KafkaService: Failed to consume from ${topic}`, error);
      throw error;
    }
  }

  getKafka() {
    return this.kafka;
  }
}
