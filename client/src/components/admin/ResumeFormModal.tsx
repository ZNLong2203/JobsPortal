import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Resume, NewResume } from '@/types/resume'
import { useUsers } from '@/hooks/useUsers'
import { useCompanies } from '@/hooks/useCompanies'
import { useJobs } from '@/hooks/useJobs'

interface ResumeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resume: NewResume) => void;
  initialData?: Resume;
}

export function ResumeFormModal({ isOpen, onClose, onSubmit, initialData }: ResumeFormModalProps) {
  const [resume, setResume] = useState<NewResume>({
    user: '',
    company: '',
    job: '',
    url: '',
    status: '',
  })

  const { users } = useUsers()
  const { companies } = useCompanies()
  const companiesList = Array.isArray(companies) ? companies : companies?.companies || []
  const { jobs } = useJobs()
  const jobsList = Array.isArray(jobs) ? jobs : jobs?.jobs || []

  useEffect(() => {
    if (initialData) {
      setResume(initialData)
    } else {
      setResume({
        user: '',
        company: '',
        job: '',
        url: '',
        status: '',
      })
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
              <Label htmlFor="user">User</Label>
              <Select
                value={resume.user.toString()}
                onValueChange={(value) => setResume({ ...resume, user: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Select
                value={resume.company.toString()}
                onValueChange={(value) => setResume({ ...resume, company: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companiesList.map((company) => (
                    <SelectItem key={company._id} value={company._id || ''}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="job">Job</Label>
              <Select
                value={resume.job.toString()}
                onValueChange={(value) => setResume({ ...resume, job: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {jobsList.map((job) => (
                    <SelectItem key={job._id} value={job._id}>
                      {job.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="url">Resume URL</Label>
              <Input
                id="url"
                value={resume.url}
                onChange={(e) => setResume({ ...resume, url: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={resume.status}
                onChange={(e) => setResume({ ...resume, status: e.target.value })}
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

