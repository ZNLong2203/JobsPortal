export interface Job {
  id?: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

export interface NewJob extends Omit<Job, 'id'> {
  id?: number;
}
