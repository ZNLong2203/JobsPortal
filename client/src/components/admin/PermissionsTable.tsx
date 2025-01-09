import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Permission } from '@/types/permission'

interface PermissionsTableProps {
  permissions: Permission[];
  onEdit: (permission: Permission) => void;
  onDelete: (id: string) => void;
}

export function PermissionsTable({ permissions, onEdit, onDelete }: PermissionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>API Path</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Module</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission._id}>
            <TableCell>{permission.name}</TableCell>
            <TableCell>{permission.apiPath}</TableCell>
            <TableCell>{permission.method}</TableCell>
            <TableCell>{permission.module}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(permission)}>
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(permission._id!)}>
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

