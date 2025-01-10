'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CompaniesTable } from '@/components/admin/CompaniesTable'
import { CompanyFormModal } from '@/components/admin/CompanyFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCompanies } from '@/hooks/useCompanies'
import { Company, NewCompany } from '@/types/company'
import { Pagination } from "@/components/common/Pagination"
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'
import toast from 'react-hot-toast'

export default function ManageCompanies() {
  const limit = 10
  const [page, setPage] = useState(1)
  const { companies: companiesData, isLoading, isError, error, createCompany, updateCompany, deleteCompany } = useCompanies(page, limit)
  const companiesList = Array.isArray(companiesData) ? companiesData : companiesData?.companies ?? []
  const metadata = Array.isArray(companiesData) ? null : companiesData?.metadata ?? null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | undefined>(undefined)

  const handleAddCompany = (newCompany: NewCompany) => {
    createCompany(newCompany, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingCompany(undefined);
        toast.success('Company created successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to create company: ${error.message}`);
      }
    });
  };
  
  const handleEditCompany = (updatedCompany: Company) => {
    updateCompany({ company: updatedCompany }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingCompany(undefined);
        toast.success('Company updated successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to update company: ${error.message}`);
      }
    });
  };

  const handleDeleteCompany = (id: string) => {
    deleteCompany(id, {
      onSuccess: () => {
        toast({ title: "Company deleted successfully" })
      },
      onError: (error: Error) => {
        toast({ title: "Failed to delete company", description: error.message, variant: "destructive" })
      }
    })
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={error?.message || 'An error occurred'} />
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
          companies={companiesList} 
          onEdit={(company) => {
            setEditingCompany(company)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteCompany}
        />
        {metadata && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {companiesList.length} of {metadata.total} companies | Page {metadata.page} of {metadata.totalPages}
            </div>
            <Pagination
              currentPage={metadata.page}
              totalPages={metadata.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
      <CompanyFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCompany(undefined)
        }}
        onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
        initialData={editingCompany}
      />
    </Card>
  )
}

