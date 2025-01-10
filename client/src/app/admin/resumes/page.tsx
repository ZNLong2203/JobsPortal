'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ResumesTable } from '@/components/admin/ResumesTable'
import { ResumeFormModal } from '@/components/admin/ResumeFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useResumes } from '@/hooks/useResumes'
import { Resume, NewResume } from '@/types/resume'
import toast from 'react-hot-toast'
import { Pagination } from "@/components/common/Pagination"
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'

export default function ManageResumes() {
  const limit = 10
  const [page, setPage] = useState(1)
  const { resumes: resumesData, isLoading, isError, error, createResume, updateResume, deleteResume } = useResumes(page, limit)
  const resumesList = Array.isArray(resumesData) ? resumesData : resumesData?.resumes ?? []
  const metadata = Array.isArray(resumesData) ? null : resumesData?.metadata ?? null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingResume, setEditingResume] = useState<Resume | undefined>(undefined)

  const handleAddResume = (newResume: NewResume) => {
    createResume(newResume, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingResume(undefined);
        toast.success('Resume created successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to create resume: ${error.message}`);
      }
    });
  };
  
  const handleEditResume = (updatedResume: Resume) => {
    updateResume({ resume: updatedResume }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingResume(undefined);
        toast.success('Resume updated successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to update resume: ${error.message}`);
      }
    });
  };

  const handleDeleteResume = (id: string) => {
    deleteResume(id, {
      onSuccess: () => {
        toast.success("Resume deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete resume: ${error.message}`);
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
        <CardTitle>Manage Resumes</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Resume
        </Button>
      </CardHeader>
      <CardContent>
        <ResumesTable 
          resumes={resumesList} 
          onEdit={(resume) => {
            setEditingResume(resume)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteResume}
        />
        {metadata && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {resumesList.length} of {metadata.total} resumes | Page {metadata.page} of {metadata.totalPages}
            </div>
            <Pagination
              currentPage={metadata.page}
              totalPages={metadata.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
      <ResumeFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingResume(undefined)
        }}
        onSubmit={editingResume ? handleEditResume : handleAddResume}
        initialData={editingResume}
      />
    </Card>
  )
}

