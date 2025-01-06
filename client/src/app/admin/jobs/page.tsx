'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { JobsTable } from '@/components/admin/JobsTable'
import { JobFormModal } from '@/components/admin/JobFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useJobs } from '@/hooks/useJobs'
import { Job, NewJob } from '@/types/job'
import toast from 'react-hot-toast'
import { Pagination } from "@/components/common/Pagination"
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/isError'

export default function ManageJobs() {
  const limit = 10
  const [page, setPage] = useState(1)
  const { jobs: jobsData, isLoading, isError, error, createJob, updateJob, deleteJob } = useJobs(page, limit)
  const jobsList = Array.isArray(jobsData) ? jobsData : jobsData?.jobs ?? []
  const metadata = Array.isArray(jobsData) ? null : jobsData?.metadata ?? null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | undefined>(undefined)

  const handleAddJob = (newJob: NewJob) => {
    createJob(newJob, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingJob(undefined);
        toast.success('Job created successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to create job: ${error.message}`);
      }
    });
  };
  
  const handleEditJob = (updatedJob: Job) => {
    updateJob({ job: updatedJob }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingJob(undefined);
        toast.success('Job updated successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to update job: ${error.message}`);
      }
    });
  };

  const handleDeleteJob = (id: string) => {
    deleteJob(id, {
      onSuccess: () => {
        toast.success("Job deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete job: ${error.message}`);
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
        <CardTitle>Manage Jobs</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Job
        </Button>
      </CardHeader>
      <CardContent>
        <JobsTable 
          jobs={jobsList} 
          onEdit={(job) => {
            setEditingJob(job)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteJob}
        />
        {metadata && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {jobsList.length} of {metadata.total} jobs | Page {metadata.page} of {metadata.totalPages}
            </div>
            <Pagination
              currentPage={metadata.page}
              totalPages={metadata.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
      <JobFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingJob(undefined)
        }}
        onSubmit={(job: NewJob) => editingJob ? handleEditJob({ ...job, _id: editingJob._id } as Job) : handleAddJob(job)}
        initialData={editingJob}
      />
    </Card>
  )
}

