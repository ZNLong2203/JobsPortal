export class Message {
  // Common
  static readonly INVALID_ID = 'Invalid id';

  // Auth
  static readonly INVALID_CREDENTIALS = 'Invalid credentials';
  static readonly REGISTER_SUCCESS = 'User registered successfully';
  static readonly LOGIN_SUCCESS = 'User logged in successfully';

  // User
  static readonly USER_NOT_FOUND = 'User not found';
  static readonly USER_ALREADY_EXISTS = 'User already exists';
  static readonly USER_ALL_FETCHED = 'All user fetched successfully';
  static readonly USER_FETCHED = 'User fetched successfully';
  static readonly USER_UPDATED = 'User updated successfully';
  static readonly USER_DELETED = 'User deleted successfully';

  // Company
  static readonly COMPANY_NOT_FOUND = 'Company not found';
  static readonly COMPANY_NOT_YOURS = 'Company not yours';
  static readonly COMPANY_ALREADY_EXISTS = 'Company already exists';
  static readonly COMPANY_CREATED = 'Company created successfully';
  static readonly COMPANY_ALL_FETCHED = 'All company fetched successfully';
  static readonly COMPANY_FETCHED = 'Company fetched successfully';
  static readonly COMPANY_UPDATED = 'Company updated successfully';
  static readonly COMPANY_DELETED = 'Company deleted successfully';
}
