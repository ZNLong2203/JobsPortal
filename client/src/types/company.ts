export interface Company {
  _id?: string;
  name: string;
  address: string;
  industry: string;
  employees: number;
  logo?: string;
  des: string;
  website?: string;
  contactEmail?: string;
}

export interface NewCompany extends Omit<Company, '_id'> {
  _id?: string;
}