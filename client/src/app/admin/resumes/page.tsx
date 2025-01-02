'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ResumesTable } from '@/components/admin/ResumesTable'
import { ResumeFormModal } from '@/components/admin/ResumeFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Resume, NewResume } from '@/types/resume'

export default function ManageResumes() {
  const [resumes, setResumes] = useState<Resume[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', jobTitle: 'Software Engineer', submittedDate: '2023-06-15', resumeUrl: '/resumes/john-doe.pdf' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', jobTitle: 'Marketing Manager', submittedDate: '2023-06-14', resumeUrl: '/resumes/jane-smith.pdf' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', jobTitle: 'Data Analyst', submittedDate: '2023-06-13', resumeUrl: '/resumes/bob-johnson.pdf' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingResume, setEditingResume] = useState<Resume | undefined>(undefined)

  const handleAddResume = (newResume: NewResume) => {
    const resumeToAdd: Resume = {
      ...newResume,
      id: resumes.length + 1
    }
    setResumes([...resumes, resumeToAdd])
    setIsModalOpen(false)
  }

  const handleEditResume = (updatedResume: NewResume) => {
    if (!updatedResume.id) return
    setResumes(resumes.map(resume => 
      resume.id === updatedResume.id ? { ...updatedResume, id: resume.id } : resume
    ))
    setIsModalOpen(false)
    setEditingResume(undefined)
  }

  const handleDeleteResume = (id: number) => {
    setResumes(resumes.filter(resume => resume.id !== id))
  }

  const handleViewResume = (resumeUrl: string) => {
    window.open(resumeUrl, '_blank')
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
          resumes={resumes} 
          onEdit={(resume) => {
            setEditingResume(resume)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteResume}
          onView={handleViewResume}
        />
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

