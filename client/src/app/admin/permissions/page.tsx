'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast from 'react-hot-toast'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { PermissionsTable } from '@/components/admin/PermissionsTable'
import { PermissionFormModal } from '@/components/admin/PermissionFormModal'
import { usePermissions } from '@/hooks/usePermissions'
import { Permission } from '@/types/permission'
import { Pagination } from "@/components/common/Pagination"

export default function PermissionsPage() {
  const limit = 10
  const [page, setPage] = useState(1)
  const { permissions, metadata, isLoading, isError, error, createPermission, updatePermission, deletePermission } = usePermissions(page, limit)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.module.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPermission = (newPermission: Permission) => {
    createPermission(newPermission, {
      onSuccess: () => {
        setIsModalOpen(false)
        toast.success('Permission created successfully')
      },
      onError: (error: Error) => {
        toast.error(`Failed to create permission: ${error.message}`)
      }
    })
  }

  const handleEditPermission = (updatedPermission: Permission) => {
    updatePermission(updatedPermission, {
      onSuccess: () => {
        setIsModalOpen(false)
        setEditingPermission(null)
        toast.success('Permission updated successfully')
      },
      onError: (error: Error) => {
        toast.error(`Failed to update permission: ${error.message}`)
      }
    })
  }

  const handleDeletePermission = (id: string) => {
    deletePermission(id, {
      onSuccess: () => {
        toast.success("Permission deleted successfully")  
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete permission: ${error.message}`)
      }
    })
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>
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
        <div className="flex items-center space-x-2 mb-4">
          <Input
            placeholder="Search permissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <PermissionsTable 
          permissions={filteredPermissions} 
          onEdit={(permission) => {
            setEditingPermission(permission)
            setIsModalOpen(true)
          }}
          onDelete={handleDeletePermission}
        />
        {metadata && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredPermissions.length} of {metadata.total} permissions | Page {metadata.page} of {metadata.totalPages}
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
          setEditingPermission(null)
        }}
        onSubmit={editingPermission ? handleEditPermission : handleAddPermission}
        initialData={editingPermission}
      />
    </Card>
  )
}

