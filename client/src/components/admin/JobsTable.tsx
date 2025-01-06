import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Job } from '@/types/job'

interface JobsTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export function JobsTable({ jobs, onEdit, onDelete }: JobsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job._id}>
            <TableCell>{job.name}</TableCell>
            <TableCell>{typeof job.company === 'object' ? job.company.name : 'N/A'}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell>${job.salary}</TableCell>
            <TableCell>{job.level}</TableCell>
            <TableCell>{job.type}</TableCell>
            <TableCell>{job.isActive ? 'Active' : 'Inactive'}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(job)}>
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(job._id)}>
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

