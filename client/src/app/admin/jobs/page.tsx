'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { JobsTable } from '@/components/admin/JobsTable'
import { JobFormModal } from '@/components/admin/JobFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Job, NewJob } from '@/types/job'

export default function ManageJobs() {
  const [jobs, setJobs] = useState<Job[]>([
    { 
      id: 1, 
      title: 'Software Engineer', 
      company: 'TechCorp', 
      location: 'San Francisco, CA', 
      type: 'Full-time', 
      description: 'We are seeking a talented Software Engineer...' 
    },
    { 
      id: 2, 
      title: 'Marketing Manager', 
      company: 'BrandBoost', 
      location: 'New York, NY', 
      type: 'Full-time', 
      description: 'BrandBoost is looking for an experienced Marketing Manager...' 
    },
    { 
      id: 3, 
      title: 'Data Analyst', 
      company: 'DataInsights', 
      location: 'Chicago, IL', 
      type: 'Contract', 
      description: 'Join our data team to help derive meaningful insights...' 
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | undefined>(undefined)

  const handleAddJob = (newJob: NewJob) => {
    const jobToAdd: Job = {
      ...newJob,
      id: jobs.length + 1
    }
    setJobs([...jobs, jobToAdd])
    setIsModalOpen(false)
  }

  const handleEditJob = (updatedJob: NewJob) => {
    if (!updatedJob.id) return
    setJobs(jobs.map(job => 
      job.id === updatedJob.id ? { ...updatedJob, id: job.id } : job
    ))
    setIsModalOpen(false)
    setEditingJob(undefined)
  }

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Jobs</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Job
        </Button>
      </CardHeader>
      <CardContent>
        <JobsTable 
          jobs={jobs} 
          onEdit={(job) => {
            setEditingJob(job)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteJob}
        />
      </CardContent>
      <JobFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingJob(undefined)
        }}
        onSubmit={editingJob ? handleEditJob : handleAddJob}
        initialData={editingJob}
      />
    </Card>
  )
}

