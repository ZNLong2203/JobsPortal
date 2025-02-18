import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailInfoDto } from './dto/email-info.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendApproveEmail(emailInfo: EmailInfoDto) {
    try {
      await this.mailerService.sendMail({
        to: emailInfo.mail,
        subject: 'Resume Approved',
        template: 'mail-approved-template',
        context: {
          candidateName: emailInfo.candidateName,
          jobTitle: emailInfo.jobTitle,
          companyName: emailInfo.companyName,
          jobPortalLink: `${process.env.CLIENT_URL}`,
          currentYear: new Date().getFullYear(),
        },
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendRejectEmail(emailInfo: EmailInfoDto) {
    try {
      await this.mailerService.sendMail({
        to: emailInfo.mail,
        subject: 'Resume Rejected',
        template: 'mail-rejected-template',
        context: {
          candidateName: emailInfo.candidateName,
          jobTitle: emailInfo.jobTitle,
          companyName: emailInfo.companyName,
          jobPortalLink: `${process.env.CLIENT_URL}`,
          currentYear: new Date().getFullYear(),
        },
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
