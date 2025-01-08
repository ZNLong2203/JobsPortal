import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Role, NewRole } from '@/types/role'

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (role: NewRole) => void;
  initialData?: Role;
}

export function RoleFormModal({ isOpen, onClose, onSubmit, initialData }: RoleFormModalProps) {
  const [role, setRole] = useState<NewRole>({
    name: '',
    des: '',
    isActive: true,
    permissions: [],
  })

  useEffect(() => {
    if (initialData) {
      setRole(initialData)
    } else {
      setRole({
        name: '',
        des: '',
        isActive: true,
        permissions: [],
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(role)
  }

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
              <Label htmlFor="permissions">Permissions (comma-separated)</Label>
              <Input
                id="permissions"
                value={role.permissions.join(', ')}
                onChange={(e) => setRole({ ...role, permissions: e.target.value.split(',').map(p => p.trim()) })}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Add'} Role
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

