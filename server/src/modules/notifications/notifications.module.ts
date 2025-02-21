import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Subscriber } from 'rxjs';
import { SubscriberSchema } from '../subscribers/schemas/subscriber.schema';
import { Job, JobSchema } from '../jobs/schemas/job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
      { name: Job.name, schema: JobSchema },
    ]),
    MailModule,
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
