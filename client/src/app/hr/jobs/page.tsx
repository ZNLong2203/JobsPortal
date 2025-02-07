'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from 'lucide-react'
import { useJobs } from '@/hooks/useJobs'
import { Job } from '@/types/job'
import toast from 'react-hot-toast'
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'
import { JobFormModal } from '@/components/admin/JobFormModal'

export default function JobManagement() {
  const page = 1
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  const { jobs, isLoading, isError, error, createJob, updateJob, deleteJob } = useJobs(page)

  const filteredJobs = (jobs && 'jobs' in jobs ? jobs.jobs : []).filter(job => 
    job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof job.company !== 'string' && job.company.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCreateJob = (newJob: Omit<Job, '_id'>) => {
    createJob(newJob, {
      onSuccess: () => {
        toast.success('Job created successfully')
        setIsModalOpen(false)
      },
      onError: (error) => {
        toast.error(`Failed to create job: ${error.message}`)
      }
    })
  }

  const handleUpdateJob = (updatedJob: Job) => {
    const jobToUpdate: Job = {
      ...updatedJob,
      company: typeof updatedJob.company === 'object' && updatedJob.company._id 
        ? updatedJob.company._id 
        : updatedJob.company
    }

    updateJob({ job: jobToUpdate }, {
      onSuccess: () => {
        toast.success('Job updated successfully')
        setIsModalOpen(false)
        setEditingJob(null)
      },
      onError: (error: Error) => {
        toast.error(`Failed to update job: ${error.message}`)
      }
    })
  }

  const handleDeleteJob = (id: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id, {
        onSuccess: () => {
          toast.success("Job deleted successfully")
        },
        onError: (error) => {
          toast.error(`Failed to delete job: ${error.message}`)
        }
      })
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || "An error occurred while fetching jobs"} />

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search jobs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>{typeof job.company === 'string' ? job.company : job.company.name}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>${job.salary}</TableCell>
                  <TableCell>
                    <Badge variant={job.isActive ? 'default' : 'secondary'}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setEditingJob(job)
                        setIsModalOpen(true)
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteJob(job._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <JobFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingJob(null)
        }}
        onSubmit={(job) => {
          if (editingJob) {
            handleUpdateJob({ ...job, _id: editingJob._id } as Job)
          } else {
            handleCreateJob(job)
          }
        }}
        initialData={editingJob || undefined}
      />
    </div>
  )
}
