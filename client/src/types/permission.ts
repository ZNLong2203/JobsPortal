export interface Permission {
  _id?: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
}

export interface NewPermission extends Omit<Permission, '_id'> {
  _id?: string;
}