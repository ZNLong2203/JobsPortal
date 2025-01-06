import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Company } from '@/types/company'
import Image from 'next/image'

interface CompaniesTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

export function CompaniesTable({ companies, onEdit, onDelete }: CompaniesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company._id}>
            <TableCell>
              <Image src={company.logo} alt={company.name} width={50} height={50} className="rounded-full" />
            </TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.address}</TableCell>
            <TableCell>{company.des}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(company)}>
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(company._id!)}>
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

