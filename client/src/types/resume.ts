export interface Resume {
  _id?: string;
  name: string;
  email: string;
  jobTitle: string;
  submittedDate: string;
  resumeUrl: string;
}

export interface NewResume extends Omit<Resume, '_id'> {
  _id?: string;
}