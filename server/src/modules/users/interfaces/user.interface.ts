import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: string;
  gender: string;
  age: number;
  address: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
