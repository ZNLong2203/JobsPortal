'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PermissionsTable } from '@/components/admin/PermissionsTable'
import { PermissionFormModal } from '@/components/admin/PermissionFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePermissions } from '@/hooks/usePermissions'
import { Permission, NewPermission } from '@/types/permission'
import toast from 'react-hot-toast'
import { Pagination } from "@/components/common/Pagination"
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'

export default function ManagePermissions() {
  const limit = 10
  const [page, setPage] = useState(1)
  const { permissions: permissionsData, isLoading, isError, error, createPermission, updatePermission, deletePermission } = usePermissions(page, limit)
  const permissionsList = Array.isArray(permissionsData) ? permissionsData : permissionsData?.permissions ?? []
  const metadata = Array.isArray(permissionsData) ? null : permissionsData?.metadata ?? null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | undefined>(undefined)

  const handleAddPermission = (newPermission: NewPermission) => {
    createPermission(newPermission, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingPermission(undefined);
        toast.success('Permission created successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to create permission: ${error.message}`);
      }
    });
  };
  
  const handleEditPermission = (updatedPermission: Permission) => {
    updatePermission({ permission: updatedPermission }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingPermission(undefined);
        toast.success('Permission updated successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to update permission: ${error.message}`);
      }
    });
  };

  const handleDeletePermission = (id: string) => {
    deletePermission(id, {
      onSuccess: () => {
        toast.success("Permission deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete permission: ${error.message}`);
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
        <CardTitle>Manage Permissions</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Permission
        </Button>
      </CardHeader>
      <CardContent>
        <PermissionsTable 
          permissions={permissionsList} 
          onEdit={(permission) => {
            setEditingPermission(permission)
            setIsModalOpen(true)
          }}
          onDelete={handleDeletePermission}
        />
        {metadata && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {permissionsList.length} of {metadata.total} permissions | Page {metadata.page} of {metadata.totalPages}
            </div>
            <Pagination
              currentPage={metadata.page}
              totalPages={metadata.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
      <PermissionFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPermission(undefined)
        }}
        onSubmit={(permission: NewPermission) => editingPermission ? handleEditPermission({ ...permission, _id: editingPermission._id } as Permission) : handleAddPermission(permission)}
        initialData={editingPermission}
      />
    </Card>
  )
}
