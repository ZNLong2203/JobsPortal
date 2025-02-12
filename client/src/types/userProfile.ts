export enum ProfileFieldEnum {
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  CERTIFICATIONS = 'certifications',
  SKILLS = 'skills',
  LANGUAGES = 'languages'
}

export interface UserProfile {
  userId: string;
  gender: string;
  age: number;
  address: string;
  phone: string;
  skills: string[];
  bio: string;
  languages: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
  }[];
  certifications: string[];
}

export interface UpdateUserProfileDto {
  userId?: string;
  gender?: string;
  age?: number;
  address?: string;
  phone?: string;
  skills?: string[];
  bio?: string;
  languages?: string[];
  experience?: Array<{
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
  }>;
  certifications?: string[];
}