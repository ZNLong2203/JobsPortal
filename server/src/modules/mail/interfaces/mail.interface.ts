export enum EmailEventType {
  RESUME_APPROVED = 'RESUME_APPROVED',
  RESUME_REJECTED = 'RESUME_REJECTED',
}

export interface EmailEvent {
  type: EmailEventType;
  data: {
    to: string;
    candidateName: string;
    jobTitle: string;
    companyName: string;
    jobPortalLink: string;
    timestamp: Date;
  };
}

export interface JobNotificationEmailData {
  to: string;
  subject: string;
  template: string;
  context: {
    name: string;
    jobs: {
      title: string;
      company: string;
      location: string;
      salary: number;
      skills: string;
      applicationLink: string;
    }[];
    unsubscribeLink: string;
  };
}
