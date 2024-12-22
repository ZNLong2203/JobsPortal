export class Message {
  // Auth
  static readonly INVALID_CREDENTIALS = 'Invalid credentials';
  static readonly REGISTER_SUCCESS = 'User registered successfully';
  static readonly LOGIN_SUCCESS = 'User logged in successfully';

  // User
  static readonly USER_NOT_FOUND = 'User not found';
  static readonly USER_ALREADY_EXISTS = 'User already exists';
  static readonly FETCH_ALL_USER_SUCCESS = 'All user fetched successfully';
  static readonly FETCH_USER_SUCCESS = 'User fetched successfully';
  static readonly UPDATE_USER_SUCCESS = 'User updated successfully';
  static readonly DELETE_USER_SUCCESS = 'User deleted successfully';

  // Company
  static readonly COMPANY_NOT_FOUND = 'Company not found';
  static readonly COMPANY_ALREADY_EXISTS = 'Company already exists';
  static readonly COMPANY_CREATED = 'Company created successfully';
  static readonly COMPANY_ALL_FETCHED = 'All company fetched successfully';
  static readonly COMPANY_FETCHED = 'Company fetched successfully';
  static readonly COMPANY_UPDATED = 'Company updated successfully';
  static readonly COMPANY_DELETED = 'Company deleted successfully';
}
