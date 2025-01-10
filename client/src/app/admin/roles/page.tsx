'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RolesTable } from '@/components/admin/RolesTable'
import { RoleFormModal } from '@/components/admin/RoleFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRoles } from '@/hooks/useRoles'
import { Role, NewRole } from '@/types/role'
import toast from 'react-hot-toast'
import { Pagination } from "@/components/common/Pagination"
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'

export default function ManageRoles() {
  const limit = 10
  const [page, setPage] = useState(1)
  const { roles: rolesData, isLoading, isError, error, createRole, updateRole, deleteRole } = useRoles(page, limit)
  const rolesList = Array.isArray(rolesData) ? rolesData : rolesData?.roles ?? []
  const metadata = Array.isArray(rolesData) ? null : rolesData?.metadata ?? null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | undefined>(undefined)

  const handleAddRole = (newRole: NewRole) => {
    createRole(newRole, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingRole(undefined);
        toast.success('Role created successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to create role: ${error.message}`);
      }
    });
  };
  
  const handleEditRole = (updatedRole: Role) => {
    updateRole({ role: updatedRole }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingRole(undefined);
        toast.success('Role updated successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to update role: ${error.message}`);
      }
    });
  };

  const handleDeleteRole = (id: string) => {
    deleteRole(id, {
      onSuccess: () => {
        toast.success("Role deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete role: ${error.message}`);
      }
    })
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={error?.message || 'An error occurred'} />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Roles</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Role
        </Button>
      </CardHeader>
      <CardContent>
        <RolesTable 
          roles={rolesList} 
          onEdit={(role) => {
            setEditingRole(role)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteRole}
        />
        {metadata && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {rolesList.length} of {metadata.total} roles | Page {metadata.page} of {metadata.totalPages}
            </div>
            <Pagination
              currentPage={metadata.page}
              totalPages={metadata.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
      <RoleFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingRole(undefined)
        }}
        onSubmit={(role: NewRole) => editingRole ? handleEditRole({ ...role, _id: editingRole._id } as Role) : handleAddRole(role)}
        initialData={editingRole}
      />
    </Card>
  )
}

