import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
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

  @Prop({ type: Types.ObjectId, ref: Role.name, default: 'member' })
  role: Types.ObjectId | Role;

  @Prop({ type: [Types.ObjectId], ref: Permission.name })
  permissions: Types.ObjectId[] | Permission[];

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
