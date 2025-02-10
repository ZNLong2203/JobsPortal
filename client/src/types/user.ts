export interface User {
  _id: string,
  email: string,
  name: string,
  avatar?: string,
  company?: string,
  role?: string,
  permissions?: string[],
  gender?: string,
  age?: number,
  address?: string,
}

export interface UpdateUser {
  _id: string;
  email?: string;
  name?: string;
  avatar?: string;
  company?: string;
  role?: string;
  permissions?: string[];
  gender?: string;
  age?: number;
  address?: string;
}

export interface NewUser extends Omit<User, '_id'> {
  _id?: string;
  password: string;
}