"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, CheckCircle, XCircle, Clock, Download, Eye, Search } from "lucide-react"
import { useUserStatistics } from "@/hooks/useStatistics"
import moment from "moment"
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"
import type { Resume } from "@/types/resume"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function ResumeHistoryPage() {
  const { data: userStatistics, isLoading, isError, error } = useUserStatistics()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={error?.message || "An error occurred"} />
  }

  const filteredResumes = userStatistics?.resumes.filter((resume: Resume) => {
    const matchesSearch =
      (typeof resume.job === "object" ? resume.job.name.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
      (typeof resume.company === "object" ? resume.company.name.toLowerCase() : "").includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || resume.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Resume History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value={userStatistics?.totalApplicantsResume || "0"}
          icon={<FileText className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Accepted"
          value={userStatistics?.totalApproveResumes || "0"}
          icon={<CheckCircle className="h-6 w-6" />}
          color="bg-green-500"
        />
        <StatCard
          title="Rejected"
          value={userStatistics?.totalRejectedResumes || "0"}
          icon={<XCircle className="h-6 w-6" />}
          color="bg-red-500"
        />
        <StatCard
          title="Pending"
          value={userStatistics?.totalPendingResumes || "0"}
          icon={<Clock className="h-6 w-6" />}
          color="bg-yellow-500"
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by position or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="hidden md:table-cell">Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResumes?.map((resume: Resume) => (
                  <TableRow key={resume._id}>
                    <TableCell className="font-medium">
                      {typeof resume.job === "object" ? resume.job.name : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {typeof resume.company === "object" && (
                          <Image
                            src={resume.company.logo || "/default-company-logo.png"}
                            alt={resume.company.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        {typeof resume.company === "object" ? resume.company.name : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {resume.createdAt ? moment(resume.createdAt).format("MMM DD, YYYY") : "N/A"}
                    </TableCell>
                    <TableCell>{getStatusBadge(resume.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {resume.url && (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl w-full">
                                <DialogHeader>
                                  <DialogTitle>Application Details</DialogTitle>
                                  <DialogDescription>
                                    Review your application for{" "}
                                    {typeof resume.job === "object" ? resume.job.name : "N/A"} at{" "}
                                    {typeof resume.company === "object" ? resume.company.name : "N/A"}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Job Details</h3>
                                    <p>
                                      <strong>Position:</strong>{" "}
                                      {typeof resume.job === "object" ? resume.job.name : "N/A"}
                                    </p>
                                    <p>
                                      <strong>Company:</strong>{" "}
                                      {typeof resume.company === "object" ? resume.company.name : "N/A"}
                                    </p>
                                    <p>
                                      <strong>Applied on:</strong>{" "}
                                      {resume.createdAt ? moment(resume.createdAt).format("MMMM DD, YYYY") : "N/A"}
                                    </p>
                                    <p>
                                      <strong>Status:</strong> {resume.status}
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Your Application</h3>
                                    <p>
                                      <strong>Name:</strong> {resume.name}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {resume.email}
                                    </p>
                                    <p>
                                      <strong>Phone:</strong> {resume.phone}
                                    </p>
                                    <p>
                                      <strong>Cover Letter:</strong> {resume.coverLetter}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-6">
                                  <h3 className="text-lg font-semibold mb-2">Application Progress</h3>
                                  <div className="space-y-2">
                                    <div>
                                      <div className="flex justify-between text-sm font-medium">
                                        <span>Application Submitted</span>
                                        <span>100%</span>
                                      </div>
                                      <Progress value={100} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm font-medium">
                                        <span>Resume Reviewed</span>
                                        <span>{resume.status !== "pending" ? "100%" : "0%"}</span>
                                      </div>
                                      <Progress value={resume.status !== "pending" ? 100 : 0} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm font-medium">
                                        <span>Interview Scheduled</span>
                                        <span>{resume.status === "approved" ? "100%" : "0%"}</span>
                                      </div>
                                      <Progress value={resume.status === "approved" ? 100 : 0} className="h-2" />
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm" asChild>
                              <a href={resume.url} download>
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </a>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
      return <Badge className="bg-green-500">Approved</Badge>
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>
    case "pending":
      return <Badge variant="secondary">Pending</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

