import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Permission } from 'src/modules/permissions/schemas/permission.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop()
  name: string;

  @Prop()
  des: string;

  @Prop()
  isActive: boolean;

  @Prop({ type: [Types.ObjectId], ref: Permission.name })
  permissions: Types.ObjectId[] | Permission[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy: Types.ObjectId | User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
