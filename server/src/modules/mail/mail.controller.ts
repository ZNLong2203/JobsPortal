import { Controller, Get, Body, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('approve')
  async sendApproveMail(@Body() body: { mail: string; token: string }) {
    await this.mailService.sendApproveEmail(body.mail, body.token);
    return {
      message: 'Email sent',
    };
  }
}
