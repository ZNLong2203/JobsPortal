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
import { User, NewUser } from '@/types/user'
import { useRoles } from '@/hooks/useRoles'
import { Role } from '@/types/role'

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser) => void;
  initialData?: User;
}

export function UserFormModal({ isOpen, onClose, onSubmit, initialData }: UserFormModalProps) {
  const [user, setUser] = useState<NewUser>({
    email: '',
    name: '',
    avatar: '',
    role: '',
    permissions: [],
    gender: '',
    age: 0,
    address: '',
  })

  const { roles } = useRoles()

  useEffect(() => {
    if (initialData) {
      setUser({
        email: initialData.email,
        name: initialData.name,
        avatar: initialData.avatar,
        role: typeof initialData.role === 'object' ? (initialData.role as Role)._id : initialData.role,
        permissions: initialData.permissions,
        gender: typeof initialData.profile === 'object' ? initialData.profile.gender || '' : '',
        age: typeof initialData.profile === 'object' ? initialData.profile.age || 0 : 0,
        address: typeof initialData.profile === 'object' ? initialData.profile.address || '' : '',
      })
    } else {
      setUser({
        email: '',
        name: '',
        avatar: '',
        role: '',
        permissions: [],
        gender: '',
        age: 0,
        address: '',
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(user)
  }

  const roleOptions = Array.isArray(roles)
    ? roles.map((r: Role) => ({ 
        label: r.name, 
        value: r._id || '' 
      }))
    : []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={user.avatar}
                onChange={(e) => setUser({ ...user, avatar: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={typeof user.role === 'object' ? user.role._id : user.role}
                onValueChange={(value) => setUser({ ...user, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={user.gender}
                onValueChange={(value) => setUser({ ...user, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={user.age}
                onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Add'} User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
