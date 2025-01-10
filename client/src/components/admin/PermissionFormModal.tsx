import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Permission, NewPermission } from '@/types/permission'

interface PermissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (permission: NewPermission) => void;
  initialData?: Permission;
}

export function PermissionFormModal({ isOpen, onClose, onSubmit, initialData }: PermissionFormModalProps) {
  const [permission, setPermission] = useState<NewPermission>({
    name: '',
    apiPath: '',
    method: 'GET',
    module: '',
  })

  useEffect(() => {
    if (initialData) {
      setPermission(initialData)
    } else {
      setPermission({
        name: '',
        apiPath: '',
        method: 'GET',
        module: '',
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(permission)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Permission' : 'Add New Permission'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Permission Name</Label>
              <Input
                id="name"
                value={permission.name}
                onChange={(e) => setPermission({ ...permission, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="apiPath">API Path</Label>
              <Input
                id="apiPath"
                value={permission.apiPath}
                onChange={(e) => setPermission({ ...permission, apiPath: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="method">Method</Label>
              <Select
                value={permission.method}
                onValueChange={(value) => setPermission({ ...permission, method: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="module">Module</Label>
              <Input
                id="module"
                value={permission.module}
                onChange={(e) => setPermission({ ...permission, module: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Add'} Permission
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

