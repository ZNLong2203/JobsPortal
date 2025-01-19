import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Job, NewJob } from '@/types/job'
import { Company } from '@/types/company'
import { useCompanies } from '@/hooks/useCompanies'
import { HelpCircle, Bold, Italic, List, ListOrdered } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import moment from 'moment'


interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: NewJob) => void;
  initialData?: Job;
}

export function JobFormModal({ isOpen, onClose, onSubmit, initialData }: JobFormModalProps) {
  const [job, setJob] = useState<NewJob>({
    name: '',
    company: '',
    skills: [],
    location: '',
    salary: 0,
    quantity: 0,
    level: '',
    category: '',
    type: '',
    des: '',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    isActive: true,
  })

  const { companies } = useCompanies()

  const resetForm = () => {
    setJob({
      name: '',
      company: '',
      skills: [],
      location: '',
      salary: 0,
      quantity: 0,
      level: '',
      category: '',
      type: '',
      des: '',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      isActive: true,
    })
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
    if (isOpen && initialData) {
      setJob({
        ...initialData,
        startDate: moment(initialData.startDate).format('YYYY-MM-DD'),
        endDate: moment(initialData.endDate).format('YYYY-MM-DD'),
      })
    }
  }, [isOpen, initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...job,
      startDate: moment(job.startDate).format('YYYY-MM-DD'),
      endDate: moment(job.endDate).format('YYYY-MM-DD'),
    })
  }

  const insertTextAtCursor = (text: string) => {
    const textarea = document.getElementById('des') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentValue = textarea.value
    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end)
    setJob({ ...job, des: newValue })
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Job Title</Label>
                <Input
                  id="name"
                  value={job.name}
                  onChange={(e) => setJob({ ...job, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Select
                  value={job.company.toString()}
                  onValueChange={(value) => setJob({ ...job, company: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Array.isArray(companies) ? companies : companies.companies).map((company: Company) => (
                      <SelectItem key={company._id} value={company._id ?? ''}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={job.skills.join(', ')}
                onChange={(e) => setJob({ ...job, skills: e.target.value.split(',').map(skill => skill.trim()) })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={job.location}
                  onChange={(e) => setJob({ ...job, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  value={job.salary}
                  onChange={(e) => setJob({ ...job, salary: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={job.quantity}
                  onChange={(e) => setJob({ ...job, quantity: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={job.level}
                  onChange={(e) => setJob({ ...job, level: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={job.category}
                onChange={(e) => setJob({ ...job, category: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Job Type</Label>
              <Input
                id="type"
                value={job.type}
                onChange={(e) => setJob({ ...job, type: e.target.value })}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="des">Job Description</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Format your text using the toolbar below</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="border rounded-md">
                <div className="flex items-center gap-1 p-1 border-b">
                  <Button type="button" variant="ghost" size="sm" onClick={() => insertTextAtCursor('**Bold**')}>
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => insertTextAtCursor('*Italic*')}>
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => insertTextAtCursor('\n• ')}>
                    <List className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => insertTextAtCursor('\n1. ')}>
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  id="des"
                  value={job.des}
                  onChange={(e) => setJob({ ...job, des: e.target.value })}
                  required
                  className="min-h-[200px] border-0 rounded-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={moment(job.startDate).format('YYYY-MM-DD')}
                  onChange={(e) => setJob({ ...job, endDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={moment(job.endDate).format('YYYY-MM-DD')}
                  onChange={(e) => setJob({ ...job, endDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={job.isActive}
                onCheckedChange={(checked) => setJob({ ...job, isActive: checked })}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Add'} Job
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

