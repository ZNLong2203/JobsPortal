import { Controller, Get, Body, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/decorators/public.decorator';
import { Message } from 'src/common/message';
import { EmailInfoDto } from './dto/email-info.dto';
import { MailProducer } from './mail.producer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailProducer: MailProducer) {}

  @Public()
  @Post('approve')
  async sendApproveMail(@Body() emailInfo: EmailInfoDto) {
    await this.mailProducer.sendApprovalEmail(emailInfo);
    return {
      message: Message.EMAIL_SENT,
    };
  }

  @Public()
  @Post('reject')
  async sendRejectMail(@Body() emailInfo: EmailInfoDto) {
    await this.mailProducer.sendRejectionEmail(emailInfo);
    return {
      message: Message.EMAIL_SENT,
    };
  }
}
