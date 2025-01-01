import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ManageResumes() {
  // Mock data - replace with actual data fetching logic
  const resumes = [
    { id: 1, name: 'John Doe', email: 'john@example.com', jobTitle: 'Software Engineer', submittedDate: '2023-06-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', jobTitle: 'Marketing Manager', submittedDate: '2023-06-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', jobTitle: 'Data Analyst', submittedDate: '2023-06-13' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Resumes</h1>
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
          {resumes.map((resume) => (
            <TableRow key={resume.id}>
              <TableCell>{resume.id}</TableCell>
              <TableCell>{resume.name}</TableCell>
              <TableCell>{resume.email}</TableCell>
              <TableCell>{resume.jobTitle}</TableCell>
              <TableCell>{resume.submittedDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">View</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

