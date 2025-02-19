"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Pagination } from "@/components/common/Pagination"
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Eye,
  Download,
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { useAllResumeAndJobApplicationByUser } from "@/hooks/useUsers"
import type { RootState } from "@/redux/store"
import moment from "moment"
import Link from "next/link"

export default function AppliedJobsPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const limit = 10

  const {
    data: { resumes = [], metadata } = {},
    isLoading,
    isError,
  } = useAllResumeAndJobApplicationByUser(page, limit, userInfo?._id || "")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message="Failed to load applied jobs" />

  const filteredResumes = resumes.filter(
    (resume) =>
      ((typeof resume.job !== "string" && resume.job.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof resume.company !== "string" && resume.company.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (statusFilter === "all" || resume.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-5 w-5" />
      case "rejected":
        return <XCircle className="h-5 w-5" />
      case "pending":
        return <Clock className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const applicationStats = {
    total: resumes.length,
    pending: resumes.filter((r) => r.status.toLowerCase() === "pending").length,
    approved: resumes.filter((r) => r.status.toLowerCase() === "approved").length,
    rejected: resumes.filter((r) => r.status.toLowerCase() === "rejected").length,
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Applied Jobs</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Application Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({applicationStats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({applicationStats.pending})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({applicationStats.approved})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({applicationStats.rejected})</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="flex justify-between items-center mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{applicationStats.total}</p>
                  <p className="text-sm text-gray-500">Total Applications</p>
                </div>
                <Progress value={(applicationStats.approved / applicationStats.total) * 100} className="w-1/2" />
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="flex justify-between items-center mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{applicationStats.pending}</p>
                  <p className="text-sm text-gray-500">Pending Applications</p>
                </div>
                <Progress value={(applicationStats.pending / applicationStats.total) * 100} className="w-1/2" />
              </div>
            </TabsContent>
            <TabsContent value="approved">
              <div className="flex justify-between items-center mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{applicationStats.approved}</p>
                  <p className="text-sm text-gray-500">Approved Applications</p>
                </div>
                <Progress value={(applicationStats.approved / applicationStats.total) * 100} className="w-1/2" />
              </div>
            </TabsContent>
            <TabsContent value="rejected">
              <div className="flex justify-between items-center mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{applicationStats.rejected}</p>
                  <p className="text-sm text-gray-500">Rejected Applications</p>
                </div>
                <Progress value={(applicationStats.rejected / applicationStats.total) * 100} className="w-1/2" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredResumes.map((resume) => (
          <Card key={resume._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <Link href={`/companies/${typeof resume.company !== "string" ? resume.company._id : resume.company}`}>
                    <Image
                      src={
                        typeof resume.company !== "string"
                          ? resume.company.logo || "/default-company-logo.png"
                          : "/default-company-logo.png"
                      }
                      alt={typeof resume.company !== "string" ? `${resume.company.name} logo` : ""}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </Link>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-1">
                    <Link
                      href={`/jobs/${typeof resume.job !== "string" ? resume.job._id : resume.job}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {typeof resume.job !== "string" ? resume.job.name : ""}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <Link
                      href={`/companies/${typeof resume.company !== "string" ? resume.company._id : resume.company}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {typeof resume.company !== "string" ? resume.company.name : ""}
                    </Link>
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {typeof resume.job !== "string" ? resume.job.location : ""}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" /> {typeof resume.job !== "string" ? resume.job.type : ""}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> ${typeof resume.job !== "string" ? resume.job.salary : ""}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Applied: {moment(resume.createdAt).format("MMM DD, YYYY")}
                    </Badge>
                  </div>
                  <Badge className={`${getStatusColor(resume.status)} text-white flex items-center gap-1 w-fit`}>
                    {getStatusIcon(resume.status)}
                    {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          <Link
                            href={`/jobs/${typeof resume.job !== "string" ? resume.job._id : ""}`}
                            className="hover:text-blue-600 transition-colors duration-200"
                          >
                            {typeof resume.job !== "string" ? resume.job.name : ""}
                          </Link>
                        </DialogTitle>
                        <DialogDescription>
                          <Link
                            href={`/companies/${typeof resume.company !== "string" ? resume.company._id : ""}`}
                            className="hover:text-blue-600 transition-colors duration-200"
                          >
                            {typeof resume.company !== "string" ? resume.company.name : ""}
                          </Link>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Badge
                            className={`${getStatusColor(resume.status)} text-white col-span-2 flex items-center justify-center gap-1`}
                          >
                            {getStatusIcon(resume.status)}
                            {resume.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <MapPin className="h-4 w-4" />
                          <span className="col-span-3">
                            {typeof resume.job !== "string" ? resume.job.location : ""}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Briefcase className="h-4 w-4" />
                          <span className="col-span-3">{typeof resume.job !== "string" ? resume.job.type : ""}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <DollarSign className="h-4 w-4" />
                          <span className="col-span-3">{typeof resume.job !== "string" ? resume.job.salary : ""}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Calendar className="h-4 w-4" />
                          <span className="col-span-3">Applied: {moment(resume.createdAt).format("MMM DD, YYYY")}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Cover Letter</h4>
                        <p className="text-sm text-gray-600">{resume.coverLetter}</p>
                      </div>
                      {resume.url && (
                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href={resume.url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Download Resume
                            </a>
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {metadata && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredResumes.length} of {metadata.total} applications | Page {metadata.page} of{" "}
            {metadata.totalPages}
          </div>
          <Pagination currentPage={metadata.page} totalPages={metadata.totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}

