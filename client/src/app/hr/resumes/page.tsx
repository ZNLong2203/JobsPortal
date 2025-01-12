'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function ResumeManagement() {
  const [resumes] = useState([
    { id: 1, name: 'John Doe', position: 'Senior Developer', date: '2023-06-01', status: 'New' },
    { id: 2, name: 'Jane Smith', position: 'UX Designer', date: '2023-05-28', status: 'Reviewed' },
    { id: 3, name: 'Mike Johnson', position: 'Product Manager', date: '2023-05-25', status: 'Interviewed' },
    { id: 4, name: 'Emily Brown', position: 'Marketing Specialist', date: '2023-05-22', status: 'New' },
    { id: 5, name: 'Chris Lee', position: 'Data Analyst', date: '2023-05-20', status: 'Rejected' },
  ])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Management</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search resumes..." />
            </div>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumes.map((resume) => (
                <TableRow key={resume.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={resume.name} />
                        <AvatarFallback>{resume.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {resume.name}
                    </div>
                  </TableCell>
                  <TableCell>{resume.position}</TableCell>
                  <TableCell>{resume.date}</TableCell>
                  <TableCell>
                    <Badge variant={
                      resume.status === 'New' ? 'default' :
                      resume.status === 'Reviewed' ? 'secondary' :
                      resume.status === 'Interviewed' ? 'secondary' :
                      'destructive'
                    }>
                      {resume.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

