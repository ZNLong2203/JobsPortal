import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaProducer {
  constructor(private readonly kafkaService: KafkaService) {}

  async send(topic: string, messages: any[]) {
    const producer = this.kafkaService.getProducer();
    await producer.send({
      topic,
      messages: messages.map((message) => ({ value: JSON.stringify(message) })),
    });
  }
}
