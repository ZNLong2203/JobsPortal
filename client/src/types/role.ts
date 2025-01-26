import { Permission } from "./permission";

export interface Role {
  _id?: string;
  name: string;
  des: string;
  isActive: boolean;
  permissions: string[] | Permission[];
}

export interface NewRole extends Omit<Role, '_id'> {
  _id?: string;
} 
