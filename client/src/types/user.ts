import { Company } from "./company";
import { Permission } from "./permission";
import { Role } from "./role";
import { UserProfile } from "./userProfile";

export interface User {
  _id: string,
  email: string,
  name: string,
  avatar?: string,
  company?: Company,
  role?: Role,
  permissions?: Permission[],
  profile?: UserProfile,
  loginProvider?: string,
}

export interface UpdateUser {
  _id: string;
  email?: string;
  name?: string;
  avatar?: string;
  company?: Company;
  role?: Role;
  permissions?: Permission[];
  profile?: UserProfile;
  loginProvider?: string;
}

export interface NewUser extends Omit<User, '_id'> {
  _id?: string;
  password: string;
}