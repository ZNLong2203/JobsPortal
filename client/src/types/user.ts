import { Company } from "./company";
import { Permission } from "./permission";
import { Role } from "./role";
import { UserProfile } from "./userProfile";

export interface User {
  _id: string,
  email: string,
  name: string,
  avatar?: string,
  company?: string | Company,
  role?: string | Role,
  permissions?: string[] | Permission[],
  profile?: string | UserProfile,
  loginProvider?: string,
  gender?: string;
  age?: number;
  address?: string;
}

export interface UpdateUser {
  _id: string;
  email?: string;
  name?: string;
  avatar?: string;
  company?: string | Company;
  role?: string | Role;
  permissions?: string[] | Permission[];
  profile?: string | UserProfile;
  loginProvider?: string;
  gender?: string;
  age?: number;
  address?: string;
}

export interface NewUser extends Omit<User, '_id'> {
  _id?: string;
  password?: string;
  gender?: string;
  age?: number;
  address?: string;
}