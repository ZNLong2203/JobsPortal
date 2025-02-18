import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../../integrations/kafka/kafka.service';
import { MailService } from './mail.service';
import { EmailEvent, EmailEventType } from './interfaces/mail.interface';

@Injectable()
export class MailConsumer implements OnModuleInit {
  private readonly EMAIL_TOPIC = 'email-notifications';

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly mailService: MailService,
  ) {}

  async onModuleInit() {
    const consumer = this.kafkaService.getKafka().consumer({
      groupId: 'email-service',
    });

    await consumer.connect();
    await consumer.subscribe({ topic: this.EMAIL_TOPIC, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const emailEvent: EmailEvent = JSON.parse(message.value.toString());
          await this.handleEmailEvent(emailEvent);
        } catch (error) {
          console.error('Failed to process email event:', error);
        }
      },
    });
  }

  private async handleEmailEvent(event: EmailEvent): Promise<void> {
    switch (event.type) {
      case EmailEventType.RESUME_APPROVED:
        await this.mailService.sendApproveEmail({
          mail: event.data.to,
          candidateName: event.data.candidateName,
          jobTitle: event.data.jobTitle,
          companyName: event.data.companyName,
        });
        break;
      case EmailEventType.RESUME_REJECTED:
        await this.mailService.sendRejectEmail({
          mail: event.data.to,
          candidateName: event.data.candidateName,
          jobTitle: event.data.jobTitle,
          companyName: event.data.companyName,
        });
        break;
    }
  }
}
