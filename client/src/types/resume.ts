export interface Resume {
  id?: number;
  name: string;
  email: string;
  jobTitle: string;
  submittedDate: string;
  resumeUrl: string;
}

export interface NewResume extends Omit<Resume, 'id'> {
  id?: number;
}