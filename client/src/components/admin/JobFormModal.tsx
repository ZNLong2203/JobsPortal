import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, List, ListOrdered, HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Job, NewJob } from '@/types/job'

// interface Job {
//   id?: number;
//   title: string;
//   company: string;
//   location: string;
//   type: string;
//   description: string;
// }

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: NewJob) => void;
  initialData?: Job;
}

const jobDescriptionTemplates = [
  {
    title: "Basic Template",
    content: `About the role:
[Brief description of the role and its importance to the company]

Responsibilities:
• [Key responsibility 1]
• [Key responsibility 2]
• [Key responsibility 3]

Requirements:
• [Required skill or experience 1]
• [Required skill or experience 2]
• [Required skill or experience 3]

Benefits:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]`
  },
  {
    title: "Detailed Template",
    content: `About [Company Name]:
[Brief company description and mission]

Job Summary:
We are seeking a [Job Title] to join our team...`
  }
]

export function JobFormModal({ isOpen, onClose, onSubmit, initialData }: JobFormModalProps) {
  const [job, setJob] = useState<Job>({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
  })
  const [activeTab, setActiveTab] = useState('edit')

  useEffect(() => {
    if (initialData) {
      setJob(initialData)
    } else {
      setJob({ title: '', company: '', location: '', type: '', description: '' })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(job)
  }

  const insertTextAtCursor = (text: string) => {
    const textarea = document.getElementById('description') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentValue = textarea.value
    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end)
    setJob({ ...job, description: newValue })
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit Job</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={job.title}
                    onChange={(e) => setJob({ ...job, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={job.company}
                    onChange={(e) => setJob({ ...job, company: e.target.value })}
                    required
                  />
                </div>
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
                  <Label htmlFor="type">Job Type</Label>
                  <Input
                    id="type"
                    value={job.type}
                    onChange={(e) => setJob({ ...job, type: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="description">Job Description</Label>
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
                    id="description"
                    value={job.description}
                    onChange={(e) => setJob({ ...job, description: e.target.value })}
                    required
                    className="min-h-[200px] border-0 rounded-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-4">
                {jobDescriptionTemplates.map((template, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{template.title}</h3>
                    <pre className="text-sm bg-muted p-2 rounded mb-2 max-h-[200px] overflow-y-auto">
                      {template.content}
                    </pre>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setJob({ ...job, description: template.content })
                        setActiveTab('edit')
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

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

