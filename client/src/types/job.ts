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
  category: string;
  type: string;
  des: string;
  startDate: string | Date;
  endDate: string | Date;
  isActive: boolean;
  createdAt?: string | Date;
}

export interface NewJob extends Omit<Job, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'> {
  _id?: string;
}