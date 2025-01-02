'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CompaniesTable } from '@/components/admin/CompaniesTable'
import { CompanyFormModal } from '@/components/admin/CompanyFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface Company {
  id: number;
  name: string;
  industry: string;
  employees: number;
}

export default function ManageCompanies() {
  const [companies, setCompanies] = useState<Company[]>([
    { id: 1, name: 'TechCorp', industry: 'Technology', employees: 500 },
    { id: 2, name: 'FinanceHub', industry: 'Finance', employees: 200 },
    { id: 3, name: 'EduLearn', industry: 'Education', employees: 100 },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | undefined>(undefined)

  const handleAddCompany = (newCompany: Omit<Company, 'id'>) => {
    setCompanies([...companies, { ...newCompany, id: companies.length + 1 }])
    setIsModalOpen(false)
  }

  const handleEditCompany = (updatedCompany: Company) => {
    setCompanies(companies.map(company => 
      company.id === updatedCompany.id ? updatedCompany : company
    ))
    setIsModalOpen(false)
    setEditingCompany(undefined)
  }

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter(company => company.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Companies</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Company
        </Button>
      </CardHeader>
      <CardContent>
        <CompaniesTable 
          companies={companies} 
          onEdit={(company) => {
            setEditingCompany(company)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteCompany}
        />
      </CardContent>
      <CompanyFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCompany(undefined)
        }}
        onSubmit={(company: Omit<Company, 'id'> | Company) => editingCompany ? handleEditCompany(company as Company) : handleAddCompany(company as Omit<Company, 'id'>)}
        initialData={editingCompany}
      />
    </Card>
  )
}

