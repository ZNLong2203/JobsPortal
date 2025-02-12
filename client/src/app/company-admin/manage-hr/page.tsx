"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useAllHR, useUsers } from "@/hooks/useUsers"
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"
import toast from 'react-hot-toast'

export default function ManageHR() {
  const { data: hrTeam = [], isLoading, isError, error } = useAllHR()
  const { createUser, deleteUser } = useUsers()
  const [isAddHRDialogOpen, setIsAddHRDialogOpen] = useState(false)
  const [newHRName, setNewHRName] = useState("")
  const [newHREmail, setNewHREmail] = useState("")
  const [newHRPassword, setNewHRPassword] = useState("")
  const [newHRRole, setNewHRRole] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddHR = (e: React.FormEvent) => {
    e.preventDefault()
    createUser({
      name: newHRName,
      email: newHREmail,
      password: newHRPassword,
      role: newHRRole,
    })
    setIsAddHRDialogOpen(false)
    setNewHRName("")
    setNewHREmail("")
    setNewHRPassword("")
    setNewHRRole("")
  }

  const handleDeleteHR = (id: string) => {
    if (window.confirm('Are you sure you want to delete this HR personnel?')) {
      deleteUser(id, {
        onSuccess: () => {
          toast.success('HR personnel deleted successfully')
        },
        onError: (error: Error) => {
          toast.error(`Failed to delete HR personnel: ${error.message}`)
        }
      })
    }
  }

  const filteredHRTeam = hrTeam.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(member.role).toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || "Error loading HR team"} />

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage HR Team</h1>
        <Dialog open={isAddHRDialogOpen} onOpenChange={setIsAddHRDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add HR Personnel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New HR Personnel</DialogTitle>
              <DialogDescription>
                Enter the details of the new HR team member below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddHR}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newHRName}
                    onChange={(e) => setNewHRName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newHREmail}
                    onChange={(e) => setNewHREmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newHRPassword}
                    onChange={(e) => setNewHRPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={newHRRole}
                    onChange={(e) => setNewHRRole(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add HR Personnel</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search HR team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>HR Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredHRTeam.map((member) => (
              <div key={member._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role?.toString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteHR(member._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
