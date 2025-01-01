'use client'

import { useRouter } from 'next/navigation'
import { JobForm } from '@/components/common/JobForm'

export default function AddJob() {
  const router = useRouter()

  const handleSubmit = (data: { title: string; company: string; location: string; type: string; description: string }) => {
    // TODO: Implement job creation logic
    console.log('Add job', data)
    router.push('/admin/jobs')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Job</h1>
      <JobForm onSubmit={handleSubmit} submitLabel="Add Job" />
    </div>
  )
}

