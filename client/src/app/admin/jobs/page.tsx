import { Button } from "@/app/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import Link from 'next/link'

export default function ManageJobs() {
  // Mock data - replace with actual data fetching logic
  const jobs = [
    { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'San Francisco, CA', type: 'Full-time' },
    { id: 2, title: 'Marketing Manager', company: 'BrandBoost', location: 'New York, NY', type: 'Full-time' },
    { id: 3, title: 'Data Analyst', company: 'DataInsights', location: 'Chicago, IL', type: 'Contract' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <Link href="/admin/jobs/add">
          <Button>Add New Job</Button>
        </Link>
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
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>
                <Link href={`/admin/jobs/edit/${job.id}`}>
                  <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                </Link>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

