import { Company } from './company';
import { Job } from './job';
import { User } from './user';

export interface Resume {
  _id?: string;
  user: string | User;
  company: string | Company;
  job: string | Job;
  url: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  createdAt?: Date;
}

export interface NewResume extends Omit<Resume, '_id'> {
  _id?: string;
}