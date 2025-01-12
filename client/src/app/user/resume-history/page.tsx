'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react'

export default function ResumeHistoryPage() {
  const [applications] = useState([
    {
      id: 1,
      position: 'Senior Software Engineer',
      company: 'Tech Corp',
      companyLogo: '/placeholder.svg?height=40&width=40',
      appliedDate: '2023-12-01',
      status: 'Accepted',
      resumeVersion: 'Resume_v3.pdf',
      feedback: 'Great technical skills and experience',
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'StartUp Inc',
      companyLogo: '/placeholder.svg?height=40&width=40',
      appliedDate: '2023-11-15',
      status: 'Rejected',
      resumeVersion: 'Resume_v2.pdf',
      feedback: 'Position has been filled',
    },
    {
      id: 3,
      position: 'Frontend Engineer',
      company: 'Design Co',
      companyLogo: '/placeholder.svg?height=40&width=40',
      appliedDate: '2023-11-01',
      status: 'Pending',
      resumeVersion: 'Resume_v2.pdf',
      feedback: null,
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <Badge className="bg-green-500">{status}</Badge>
      case 'Rejected':
        return <Badge variant="destructive">{status}</Badge>
      case 'Pending':
        return <Badge variant="secondary">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value="15"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Accepted"
          value="5"
          icon={<CheckCircle className="h-4 w-4" />}
          className="bg-green-500"
        />
        <StatCard
          title="Rejected"
          value="3"
          icon={<XCircle className="h-4 w-4" />}
          className="bg-red-500"
        />
        <StatCard
          title="Pending"
          value="7"
          icon={<Clock className="h-4 w-4" />}
          className="bg-yellow-500"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resume Version</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={application.companyLogo}
                        alt={application.company}
                        className="w-6 h-6 rounded-full"
                      />
                      {application.company}
                    </div>
                  </TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>{application.resumeVersion}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Application Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications
                  .filter(app => app.feedback)
                  .map(application => (
                    <div key={application.id} className="border-l-2 border-gray-200 pl-4">
                      <div className="font-semibold">{application.position} at {application.company}</div>
                      <div className="text-gray-600">{application.feedback}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Versions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume_v3.pdf
                  </div>
                  <Badge>Current</Badge>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume_v2.pdf
                  </div>
                  <span className="text-sm">2 months ago</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume_v1.pdf
                  </div>
                  <span className="text-sm">4 months ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, className = "bg-primary" }: { 
  title: string
  value: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${className}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

