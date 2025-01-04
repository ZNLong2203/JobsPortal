export interface Company {
  id?: number;
  name: string;
  industry: string;
  employees: number;
}

export interface NewCompany extends Omit<Company, 'id'> {
  id?: number;
}