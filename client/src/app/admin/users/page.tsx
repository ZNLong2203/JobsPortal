'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UsersTable } from '@/components/admin/UsersTable'
import { UserFormModal } from '@/components/admin/UserFormModal'
import { PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUsers } from '@/hooks/useUsers'
import { User, NewUser } from '@/types/user'
import toast from 'react-hot-toast'
import { Pagination } from "@/components/common/Pagination"
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'

export default function ManageUsers() {
  const limit = 10
  const [page, setPage] = useState(1)
  const { users: usersData, isLoading, isError, error, createUser, updateUser, deleteUser } = useUsers(page, limit)
  const usersList = Array.isArray(usersData) ? usersData : usersData?.users ?? []
  const metadata = Array.isArray(usersData) ? null : usersData?.metadata ?? null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined)

  const handleAddUser = (newUser: NewUser) => {
    createUser(newUser, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingUser(undefined);
        toast.success('User created successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to create user: ${error.message}`);
      }
    });
  };
  
  const handleEditUser = (updatedUser: User) => {
    updateUser({ user: updatedUser }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingUser(undefined);
        toast.success('User updated successfully');
      },
      onError: (error: Error) => {
        toast.error(`Failed to update user: ${error.message}`);
      }
    });
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        toast.success("User deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete user: ${error.message}`);
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
        <CardTitle>Manage Users</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </CardHeader>
      <CardContent>
        <UsersTable 
          users={usersList} 
          onEdit={(user) => {
            setEditingUser(user)
            setIsModalOpen(true)
          }}
          onDelete={handleDeleteUser}
        />
        {metadata && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {usersList.length} of {metadata.total} users | Page {metadata.page} of {metadata.totalPages}
            </div>
            <Pagination
              currentPage={metadata.page}
              totalPages={metadata.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingUser(undefined)
        }}
        onSubmit={(user: NewUser) => editingUser ? handleEditUser({ ...user, _id: editingUser._id } as User) : handleAddUser(user)}
        initialData={editingUser}
      />
    </Card>
  )
}

