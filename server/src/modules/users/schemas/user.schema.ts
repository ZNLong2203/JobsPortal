import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';
import { Permission } from 'src/modules/permissions/schemas/permission.schema';
import { Role } from 'src/modules/roles/schemas/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop({
    default:
      'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png',
  })
  avatar: string;

  @Prop({ type: Types.ObjectId, ref: Role.name, default: 'member' })
  role: Types.ObjectId | Role;

  @Prop({ type: [Types.ObjectId], ref: Permission.name })
  permissions: Types.ObjectId[] | Permission[];

  @Prop({ type: Types.ObjectId, ref: Company.name })
  company: Types.ObjectId | Company;
  
  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  address: string;


  @Prop({ type: Types.ObjectId })
  createdBy: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
