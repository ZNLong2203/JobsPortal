import { Types } from 'mongoose';
import { Role } from 'src/modules/roles/schemas/role.schema';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: Types.ObjectId | Role;
  gender: string;
  age: number;
  address: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
