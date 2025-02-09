import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendApproveEmail(email: string, token: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Resume Approved',
        template: 'mail-approve-template',
        context: {
          candidateName: 'Candidate',
          jobTitle: 'Job Title',
          companyName: 'Company Name',
          dashboardLink: `${process.env.CLIENT_URL}/dashboard`,
          currentYear: new Date().getFullYear(),
          token,
        },
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendRejectEmail(email: string, token: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Resume Rejected',
        template: 'mail-reject-template',
        context: {
          candidateName: 'Candidate',
          jobTitle: 'Job Title',
          companyName: 'Company Name',
          dashboardLink: `${process.env.CLIENT_URL}/dashboard`,
          currentYear: new Date().getFullYear(),
          token,
        },
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
