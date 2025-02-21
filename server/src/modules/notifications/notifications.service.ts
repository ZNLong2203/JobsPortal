import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from '../subscribers/schemas/subscriber.schema';
import { Job } from '../jobs/schemas/job.schema';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(Subscriber.name) private subscriberModel: Model<Subscriber>,
    @InjectModel(Job.name) private jobModel: Model<Job>,
    private mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_WEEKEND)
  async handleJobNotifications(): Promise<void> {
    try {
      this.logger.log('Starting job notifications process...');

      const subscribers = await this.subscriberModel.find().lean();

      const recentJobs = await this.jobModel
        .find({
          createdAt: {
            $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
          isActive: true,
          deleted: false,
        })
        .populate('company')
        .exec();

      for (const subscriber of subscribers) {
        const matchingJobs = recentJobs.filter((job: Job) =>
          this.hasMatchingSkills(job.skills, subscriber.skills),
        );

        if (matchingJobs.length > 0) {
          await this.sendJobNotificationEmail(subscriber, matchingJobs);
        }
      }

      this.logger.log('Job notifications process completed');
    } catch (error) {
      this.logger.error('Error in job notifications process:', error);
    }
  }

  private async hasMatchingSkills(
    jobSkills: string[],
    subscriberSkills: string[],
  ): Promise<boolean> {
    return jobSkills.some((skill) =>
      subscriberSkills.some(
        (subscriberSkill) =>
          subscriberSkill.toLowerCase() === skill.toLowerCase(),
      ),
    );
  }

  private async sendJobNotificationEmail(
    subscriber: Subscriber,
    jobs: Job[],
  ): Promise<void> {
    try {
      await this.mailService.sendJobNotificationEmail({
        to: subscriber.email,
        subject: 'New Job Matches Found!',
        template: 'job-matches',
        context: {
          name: subscriber.name,
          jobs: jobs.map((job) => ({
            title: job.name,
            company:
              job.company && 'name' in job.company
                ? job.company.name
                : 'Unknown Company',
            location: job.location,
            salary: job.salary,
            skills: job.skills.join(', '),
            applicationLink: `${process.env.CLIENT_URL}/jobs`,
          })),
          unsubscribeLink: `${process.env.CLIENT_URL}/unsubscribe?email=${subscriber.email}`,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to send notification email to ${subscriber.email}: ${error.message}`,
      );
      throw error;
    }
  }
}
