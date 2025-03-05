import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  company: Types.ObjectId | Company;

  @Prop()
  skills: string[];

  @Prop()
  location: string;

  @Prop()
  salary: number;

  @Prop()
  quantity: number;

  @Prop({
    enum: ['Fresher', 'Junior', 'Middle', 'Senior', 'Manager'],
    default: 'Fresher',
  })
  level: string;

  @Prop()
  category: string;

  @Prop({
    enum: ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract'],
    default: 'Full-time',
  })
  type: string;

  @Prop()
  des: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: boolean;

  @Prop({ type: Types.ObjectId })
  createdBy: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
