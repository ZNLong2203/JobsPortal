import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilIcon, TrashIcon, SearchIcon, FileIcon } from 'lucide-react'
import { Resume } from '@/types/resume'

interface ResumesTableProps {
  resumes: Resume[];
  onEdit: (resume: Resume) => void;
  onDelete: (id: number) => void;
  onView: (resumeUrl: string) => void;
}

export function ResumesTable({ resumes, onEdit, onDelete, onView }: ResumesTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Search resumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredResumes.map((resume) => (
            <TableRow key={resume.id}>
              <TableCell>{resume.id}</TableCell>
              <TableCell>{resume.name}</TableCell>
              <TableCell>{resume.email}</TableCell>
              <TableCell>{resume.jobTitle}</TableCell>
              <TableCell>{resume.submittedDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => onView(resume.resumeUrl)}>
                  <FileIcon className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(resume)}>
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(resume.id!)}>
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

