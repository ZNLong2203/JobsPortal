import { Company } from './company';

export interface Job {
  _id: string;
  name: string;
  company: string | Company;
  skills: string[];
  location: string;
  salary: number;
  quantity: number;
  level: string;
  type: string;
  des: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface NewJob extends Omit<Job, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'> {
  _id?: string;
}