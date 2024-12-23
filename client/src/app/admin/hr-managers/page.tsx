'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddHRDialog from './add-hr-dialog'

interface HRManager {
  id: string
  name: string
  email: string
  company: string
  status: 'active' | 'inactive'
}

export default function HRManagersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hrManagers, setHRManagers] = useState<HRManager[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@techcorp.com',
      company: 'Tech Corp',
      status: 'active',
    },
    // Add more sample data as needed
  ])

  const handleAddHR = (newHR: Omit<HRManager, 'id'>) => {
    // In a real app, you would make an API call here
    const hr: HRManager = {
      ...newHR,
      id: Math.random().toString(),
    }
    setHRManagers([...hrManagers, hr])
    setIsDialogOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">HR Managers</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add HR Manager
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hrManagers.map((hr) => (
              <TableRow key={hr.id}>
                <TableCell className="font-medium">{hr.name}</TableCell>
                <TableCell>{hr.email}</TableCell>
                <TableCell>{hr.company}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    hr.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {hr.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddHRDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddHR}
      />
    </div>
  )
}

