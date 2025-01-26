import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { ErrorMessage } from '@/components/common/IsError'
import { LoadingSpinner } from '@/components/common/IsLoading'
import { MultiSelect } from '@/components/ui/multi-select' 
import { usePermissions } from '@/hooks/usePermissions'
import { NewRole, Role } from '@/types/role'
import { Permission } from '@/types/permission'

interface RoleFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (role: NewRole) => void
  initialData?: Role
}

export function RoleFormModal({ isOpen, onClose, onSubmit, initialData }: RoleFormModalProps) {
  const [role, setRole] = useState<NewRole>({
    name: '',
    des: '',
    isActive: true,
    permissions: [] as string[],
  })

  const { permissions, isLoading, isError, error } = usePermissions()

  useEffect(() => {
    if (initialData?.permissions && Array.isArray(initialData.permissions)) {
      setRole({
        ...initialData,
        permissions: initialData.permissions.map((p) =>
          typeof p === 'string' ? p : p._id || ''
        ),
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(role)
  }

  const permissionArray = Array.isArray(permissions) ? permissions : [] as Permission[]
  const permissionOptions = permissionArray.map((permission: Permission) => ({
    label: permission.name,
    value: permission._id || '',
  }))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Role' : 'Add New Role'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={role.name}
                onChange={(e) => setRole({ ...role, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="des">Description</Label>
              <Textarea
                id="des"
                value={role.des}
                onChange={(e) => setRole({ ...role, des: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={role.isActive}
                onCheckedChange={(checked) => setRole({ ...role, isActive: checked })}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <div>
              <Label htmlFor="permissions">Permissions</Label>
              {isLoading ? (
                <LoadingSpinner />
              ) : isError ? (
                <ErrorMessage message={error?.message || 'Failed to load permissions'} />
              ) : (
                <MultiSelect
                  options={permissionOptions}
                  selected={role.permissions.map(p => typeof p === 'string' ? p : p._id || '')}
                  onChange={(selected) => setRole({ ...role, permissions: selected })}
                  placeholder="Select permissions"
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
