import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
  @Prop()
  userId: Types.ObjectId;

  @Prop()
  companyId: Types.ObjectId;

  @Prop()
  jobId: Types.ObjectId;

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

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
