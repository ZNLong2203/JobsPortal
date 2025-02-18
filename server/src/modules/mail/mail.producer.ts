import { Injectable } from '@nestjs/common';
import { KafkaProducer } from '../../integrations/kafka/kafka.producer';
import { EmailEvent, EmailEventType } from './interfaces/mail.interface';
import { EmailInfoDto } from './dto/email-info.dto';

@Injectable()
export class MailProducer {
  private readonly EMAIL_TOPIC = 'email-notifications';

  constructor(private readonly kafkaProducer: KafkaProducer) {}

  async sendApprovalEmail(emailInfo: EmailInfoDto): Promise<void> {
    const emailEvent: EmailEvent = {
      type: EmailEventType.RESUME_APPROVED,
      data: {
        to: emailInfo.mail,
        candidateName: emailInfo.candidateName,
        jobTitle: emailInfo.jobTitle,
        companyName: emailInfo.companyName,
        jobPortalLink: process.env.CLIENT_URL,
        timestamp: new Date(),
      },
    };

    await this.kafkaProducer.send(this.EMAIL_TOPIC, [emailEvent]);
  }

  async sendRejectionEmail(emailInfo: EmailInfoDto): Promise<void> {
    const emailEvent: EmailEvent = {
      type: EmailEventType.RESUME_REJECTED,
      data: {
        to: emailInfo.mail,
        candidateName: emailInfo.candidateName,
        jobTitle: emailInfo.jobTitle,
        companyName: emailInfo.companyName,
        jobPortalLink: process.env.CLIENT_URL,
        timestamp: new Date(),
      },
    };

    await this.kafkaProducer.send(this.EMAIL_TOPIC, [emailEvent]);
  }
}
