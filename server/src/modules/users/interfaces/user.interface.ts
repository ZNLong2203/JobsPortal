import { Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';
import { Permission } from 'src/modules/permissions/schemas/permission.schema';
import { Role } from 'src/modules/roles/schemas/role.schema';
import { UserProfile } from '../schemas/user-profile.schema';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: Types.ObjectId | Role;
  permissions: Types.ObjectId[] | Permission[];
  company: Types.ObjectId | Company;
  profile: Types.ObjectId | UserProfile;
  loginProvider: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
