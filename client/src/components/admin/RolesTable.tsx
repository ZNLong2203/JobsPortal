import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Role } from '@/types/role'
import { Badge } from "@/components/ui/badge"
import { Permission } from "@/types/permission"

interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
}

export function RolesTable({ roles, onEdit, onDelete }: RolesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role._id}>
            <TableCell>{role.name}</TableCell>
            <TableCell>{role.des}</TableCell>
            <TableCell>
              <Badge variant={role.isActive ? "default" : "secondary"}>
                {role.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              {(role.permissions as Permission[]).map((permission) => (
                <Badge key={permission._id} variant="outline" className="mr-1">
                  {permission.name}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(role)}>
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(role._id!)}>
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
