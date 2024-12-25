import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';
import { Job } from 'src/modules/jobs/schemas/job.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  companyId: Types.ObjectId | Company;

  @Prop({ type: Types.ObjectId, ref: Job.name, required: true })
  jobId: Types.ObjectId | Job;

  @Prop()
  url: string;

  @Prop()
  status: string;

  @Prop({ type: Types.Array })
  history: {
    status: string;
    updatedAt: Date;
    updatedBy: Types.ObjectId;
  }[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId | User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
