import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    const consumer = this.kafkaService.getKafka().consumer({
      groupId: this.kafkaService.getConsumerGroupId(),
    });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
          topic,
          partition,
          offset: message.offset,
        });
      },
    });
  }
}
