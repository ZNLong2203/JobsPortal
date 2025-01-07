import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon, ExternalLinkIcon } from 'lucide-react'
import { Resume } from '@/types/resume'

interface ResumesTableProps {
  resumes: Resume[];
  onEdit: (resume: Resume) => void;
  onDelete: (id: string) => void;
}

export function ResumesTable({ resumes, onEdit, onDelete }: ResumesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resumes.map((resume) => (
          <TableRow key={resume._id}>
            <TableCell>{typeof resume.user === 'object' ? resume.user.name : 'N/A'}</TableCell>
            <TableCell>{typeof resume.company === 'object' ? resume.company.name : 'N/A'}</TableCell>
            <TableCell>{typeof resume.job === 'object' ? resume.job.name : 'N/A'}</TableCell>
            <TableCell>{resume.status}</TableCell>
            <TableCell>{resume?.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(resume)}>
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" className="mr-2" onClick={() => onDelete(resume._id!)}>
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <a href={resume.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLinkIcon className="h-4 w-4 mr-1" />
                  View
                </Button>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

