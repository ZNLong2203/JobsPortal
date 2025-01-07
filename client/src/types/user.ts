export interface User {
  _id: string,
  email: string,
  name: string,
  avatar: string,
  role: string,
  permissions: string[],
  gender: string,
  age: number,
  address: string,
}

export interface NewUser extends Omit<User, '_id'> {
  _id?: string;
}