import { Button } from "@/app/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import Link from 'next/link'

export default function ManageCompanies() {
  // Mock data - replace with actual data fetching logic
  const companies = [
    { id: 1, name: 'TechCorp', industry: 'Technology', employees: 500 },
    { id: 2, name: 'FinanceHub', industry: 'Finance', employees: 200 },
    { id: 3, name: 'EduLearn', industry: 'Education', employees: 100 },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Companies</h1>
        <Link href="/admin/companies/add">
          <Button>Add New Company</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.id}</TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.industry}</TableCell>
              <TableCell>{company.employees}</TableCell>
              <TableCell>
                <Link href={`/admin/companies/edit/${company.id}`}>
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

