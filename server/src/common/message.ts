export class Message {
  // Common
  static readonly INVALID_ID = 'Invalid id';
  static readonly INVALID_REQUEST = 'Invalid request';
  static readonly INVALID_FIELD = 'Invalid field';
  static readonly EMAIL_ALREADY_EXISTS = 'Email already exists';

  // Auth
  static readonly INVALID_CREDENTIALS = 'Invalid credentials';
  static readonly REGISTER_SUCCESS = 'User registered successfully';
  static readonly LOGIN_SUCCESS = 'User logged in successfully';
  static readonly LOGOUT_SUCCESS = 'User logged out successfully';

  // User
  static readonly USER_NOT_FOUND = 'User not found';
  static readonly USER_ALREADY_EXISTS = 'User already exists';
  static readonly USER_PROFILE_NOT_FOUND = 'User profile not found';
  static readonly USER_PROFILE_FIELD_NOT_FOUND = 'User profile field not found';
  static readonly USER_CREATED = 'User created successfully';
  static readonly USER_ALL_FETCHED = 'All user fetched successfully';
  static readonly USER_PROFILE_FETCHED = 'User profile fetched successfully';
  static readonly USER_FETCHED = 'User fetched successfully';
  static readonly USER_UPDATED = 'User updated successfully';
  static readonly USER_PROFILE_UPDATED = 'User profile updated successfully';
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
  static readonly FILE_RESUME_UPLOADED = 'Resume uploaded successfully';
  static readonly FILE_COMPANY_IMAGE_UPLOADED =
    'Company image uploaded successfully';
  static readonly FILE_USER_AVATAR_UPLOADED =
    'User avatar uploaded successfully';

  // Resume
  static readonly RESUME_CREATED = 'Resume created successfully';
  static readonly RESUME_ALL_FETCHED = 'All resume fetched successfully';
  static readonly RESUME_FETCHED = 'Resume fetched successfully';
  static readonly RESUME_UPDATED = 'Resume updated successfully';
  static readonly RESUME_STATUS_UPDATED = 'Resume status updated successfully';
  static readonly RESUME_DELETED = 'Resume deleted successfully';
  static readonly RESUME_NOT_FOUND = 'Resume not found';
  static readonly RESUME_NOT_ALLOWED = 'Resume not allowed';
  static readonly RESUME_SIZE_EXCEEDED = 'Resume size exceeded';
  static readonly RESUME_TYPE_NOT_ALLOWED = 'Resume type not allowed';

  // Permission
  static readonly PERMISSION_CREATED = 'Permission created successfully';
  static readonly PERMISSION_ALL_FETCHED =
    'All permission fetched successfully';
  static readonly PERMISSION_FETCHED = 'Permission fetched successfully';
  static readonly PERMISSION_UPDATED = 'Permission updated successfully';
  static readonly PERMISSION_DELETED = 'Permission deleted successfully';
  static readonly PERMISSION_NOT_FOUND = 'Permission not found';
  static readonly PERMISSION_NOT_ALLOWED = 'Permission not allowed';
  static readonly PERMISSION_ALREADY_EXISTS = 'Permission already exists';

  // Role
  static readonly ROLE_CREATED = 'Role created successfully';
  static readonly ROLE_ALL_FETCHED = 'All role fetched successfully';
  static readonly ROLE_FETCHED = 'Role fetched successfully';
  static readonly ROLE_UPDATED = 'Role updated successfully';
  static readonly ROLE_DELETED = 'Role deleted successfully';
  static readonly ROLE_NOT_FOUND = 'Role not found';

  // Statistics
  static readonly STATISTICS_ADMIN_FETCHED =
    'Admin statistics fetched successfully';
  static readonly STATISTICS_COMPANY_FETCHED =
    'Company statistics fetched successfully';
  static readonly STATISTICS_USER_FETCHED =
    'User statistics fetched successfully';
  static readonly STATISTICS_HR_FETCHED = 'HR statistics fetched successfully';

  // Email
  static readonly EMAIL_SENT = 'Email sent successfully';
}
