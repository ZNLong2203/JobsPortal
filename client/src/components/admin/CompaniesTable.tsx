import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilIcon, TrashIcon, SearchIcon } from 'lucide-react'

interface Company {
  id: number;
  name: string;
  industry: string;
  employees: number;
}

interface CompaniesTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
}

export function CompaniesTable({ companies, onEdit, onDelete }: CompaniesTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.employees.toString().includes(searchTerm)
  )

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.id}</TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.industry}</TableCell>
              <TableCell>{company.employees}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(company)}>
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(company.id)}>
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

