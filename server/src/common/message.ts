export class Message {
  // Common
  static readonly INVALID_ID = 'Invalid id';
  static readonly INVALID_REQUEST = 'Invalid request';
  static readonly EMAIL_ALREADY_EXISTS = 'Email already exists';

  // Auth
  static readonly INVALID_CREDENTIALS = 'Invalid credentials';
  static readonly REGISTER_SUCCESS = 'User registered successfully';
  static readonly LOGIN_SUCCESS = 'User logged in successfully';
  static readonly LOGOUT_SUCCESS = 'User logged out successfully';

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

  // Job
  static readonly JOB_NOT_FOUND = 'Job not found';
  static readonly JOB_NOT_YOURS = 'Job not yours';
  static readonly JOB_CREATED = 'Job created successfully';
  static readonly JOB_ALL_FETCHED = 'All job fetched successfully';
  static readonly JOB_FETCHED = 'Job fetched successfully';
  static readonly JOB_UPDATED = 'Job updated successfully';
  static readonly JOB_DELETED = 'Job deleted successfully';

  // File
  static readonly FILE_UPLOADED = 'File uploaded successfully';
  static readonly FILE_DELETED = 'File deleted successfully';
  static readonly FILE_NOT_FOUND = 'File not found';
  static readonly FILE_NOT_ALLOWED = 'File not allowed';
  static readonly FILE_SIZE_EXCEEDED = 'File size exceeded';
  static readonly FILE_TYPE_NOT_ALLOWED = 'File type not allowed';
}
