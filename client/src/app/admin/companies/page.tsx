'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddCompanyDialog from './add-company-dialog'

interface Company {
  id: string
  name: string
  industry: string
  location: string
  createdAt: string
}

export default function CompaniesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'Tech Corp',
      industry: 'Technology',
      location: 'San Francisco',
      createdAt: '2023-01-01',
    },
    // Add more sample data as needed
  ])

  const handleAddCompany = (newCompany: Omit<Company, 'id' | 'createdAt'>) => {
    // In a real app, you would make an API call here
    const company: Company = {
      ...newCompany,
      id: Math.random().toString(),
      createdAt: new Date().toISOString(),
    }
    setCompanies([...companies, company])
    setIsDialogOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddCompanyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddCompany}
      />
    </div>
  )
}

