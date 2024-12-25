import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  companyId: Types.ObjectId | Company;

  @Prop()
  name: string;

  @Prop()
  skills: string[];

  @Prop()
  location: string;

  @Prop()
  salary: number;

  @Prop()
  quantity: number;

  @Prop()
  level: string;

  @Prop()
  des: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy: Types.ObjectId | User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
