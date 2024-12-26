'use client'

import { useRouter } from 'next/navigation'
import { JobForm } from '@/app/components/common/JobForm'
import { useEffect, useState } from 'react'

export default function EditJob({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [initialData, setInitialData] = useState<{ title: string; company: string; location: string; type: string; description: string } | null>(null)

  useEffect(() => {
    // TODO: Fetch job data based on params.id
    // This is a mock fetch
    setInitialData({
      title: 'Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'We are seeking a talented Software Engineer to join our dynamic team...'
    })
  }, [params.id])

  const handleSubmit = (data: { title: string; company: string; location: string; type: string; description: string }) => {
    // TODO: Implement job update logic
    console.log('Update job', { id: params.id, ...data })
    router.push('/admin/jobs')
  }

  if (!initialData) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
      <JobForm initialData={initialData} onSubmit={handleSubmit} submitLabel="Update Job" />
    </div>
  )
}

