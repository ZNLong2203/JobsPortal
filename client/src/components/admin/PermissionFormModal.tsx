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
import { Permission } from '@/types/permission'

interface PermissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (permission: Permission) => void;
  initialData?: Permission | null;
}

export function PermissionFormModal({ isOpen, onClose, onSubmit, initialData }: PermissionFormModalProps) {
  const [permission, setPermission] = useState<Permission>(
    initialData || { name: '', apiPath: '', method: 'GET', module: '' }
  )

  useEffect(() => {
    if (initialData) {
      setPermission(initialData)
    } else {
      setPermission({ name: '', apiPath: '', method: 'GET', module: '' })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(permission)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Permission' : 'Add New Permission'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={permission.name}
                onChange={(e) => setPermission({ ...permission, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiPath" className="text-right">
                API Path
              </Label>
              <Input
                id="apiPath"
                value={permission.apiPath}
                onChange={(e) => setPermission({ ...permission, apiPath: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="method" className="text-right">
                Method
              </Label>
              <Select
                value={permission.method}
                onValueChange={(value) => setPermission({ ...permission, method: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module" className="text-right">
                Module
              </Label>
              <Input
                id="module"
                value={permission.module}
                onChange={(e) => setPermission({ ...permission, module: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? 'Update' : 'Add'} Permission</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

