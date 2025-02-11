import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserProfileDocument = HydratedDocument<UserProfile>;

@Schema({ timestamps: true })
export class UserProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop([String])
  skills: string[];

  @Prop()
  bio: string;

  @Prop([String])
  languages: string[];

  @Prop([
    {
      title: String,
      company: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ])
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }>;

  @Prop([
    {
      school: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
    },
  ])
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
  }>;

  @Prop()
  certifications: string[];
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
