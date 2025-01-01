'use client'

import { useRouter } from 'next/navigation'
import { CompanyForm } from '@/components/common/CompanyForm'

export default function AddCompany() {
  const router = useRouter()

  const handleSubmit = (data: { name: string; industry: string; employees: string }) => {
    // TODO: Implement company creation logic
    console.log('Add company', data)
    router.push('/admin/companies')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Company</h1>
        <p className="text-muted-foreground mt-2">Enter company information below</p>
      </div>
      <CompanyForm onSubmit={handleSubmit} submitLabel="Add Company" />
    </div>
  )
}

