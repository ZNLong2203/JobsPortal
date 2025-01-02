import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Resume, NewResume } from '@/types/resume'

interface ResumeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resume: NewResume) => void;
  initialData?: Resume;
}

export function ResumeFormModal({ isOpen, onClose, onSubmit, initialData }: ResumeFormModalProps) {
  const [resume, setResume] = useState<NewResume>({
    name: '',
    email: '',
    jobTitle: '',
    submittedDate: '',
    resumeUrl: '',
  })

  useEffect(() => {
    if (initialData) {
      setResume(initialData)
    } else {
      setResume({ name: '', email: '', jobTitle: '', submittedDate: '', resumeUrl: '' })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(resume)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Resume' : 'Add New Resume'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={resume.name}
                onChange={(e) => setResume({ ...resume, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resume.email}
                onChange={(e) => setResume({ ...resume, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={resume.jobTitle}
                onChange={(e) => setResume({ ...resume, jobTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="submittedDate">Submitted Date</Label>
              <Input
                id="submittedDate"
                type="date"
                value={resume.submittedDate}
                onChange={(e) => setResume({ ...resume, submittedDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                value={resume.resumeUrl}
                onChange={(e) => setResume({ ...resume, resumeUrl: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Add'} Resume
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

