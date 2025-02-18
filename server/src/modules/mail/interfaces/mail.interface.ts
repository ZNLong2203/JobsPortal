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
