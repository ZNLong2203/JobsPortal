'use client'

import { useRouter } from 'next/navigation'
import { CompanyForm } from '@/components/common/CompanyForm'
import { useEffect, useState } from 'react'

export default function EditCompany({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [initialData, setInitialData] = useState<{ name: string; industry: string; employees: string } | null>(null)

  useEffect(() => {
    // TODO: Fetch company data based on params.id
    // This is a mock fetch
    setInitialData({
      name: 'TechCorp',
      industry: 'Technology',
      employees: '500'
    })
  }, [params.id])

  const handleSubmit = (data: { name: string; industry: string; employees: string }) => {
    // TODO: Implement company update logic
    console.log('Update company', { id: params.id, ...data })
    router.push('/admin/companies')
  }

  if (!initialData) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Company</h1>
        <p className="text-muted-foreground mt-2">Update company information below</p>
      </div>
      <CompanyForm initialData={initialData} onSubmit={handleSubmit} submitLabel="Update Company" />
    </div>
  )
}

