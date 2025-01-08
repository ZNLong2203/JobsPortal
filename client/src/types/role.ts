export interface Role {
  _id?: string;
  name: string;
  des: string;
  isActive: boolean;
  permissions: string[];
}

export interface NewRole extends Omit<Role, '_id'> {
  _id?: string;
} 
