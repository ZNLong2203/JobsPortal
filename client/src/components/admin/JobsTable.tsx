import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilIcon, TrashIcon, SearchIcon } from 'lucide-react'
import { Job } from '@/types/job'

interface JobsTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
}

export function JobsTable({ jobs, onEdit, onDelete }: JobsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Search jobs..."
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
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(job)}>
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(job.id)}>
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

