/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, FileText, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data - replace with actual API calls in a real application
const recentJobPostings = [
  { id: 1, title: "Senior Software Engineer", department: "Engineering", applicants: 45 },
  { id: 2, title: "Product Manager", department: "Product", applicants: 32 },
  { id: 3, title: "UX Designer", department: "Design", applicants: 28 },
]

const recentApplicants = [
  { id: 1, name: "David Brown", position: "Software Engineer", status: "New" },
  { id: 2, name: "Emma Davis", position: "Product Manager", status: "Interviewed" },
  { id: 3, name: "Frank Wilson", position: "UX Designer", status: "Offered" },
]

const applicantData = [
  { name: "Jan", applicants: 65 },
  { name: "Feb", applicants: 80 },
  { name: "Mar", applicants: 90 },
  { name: "Apr", applicants: 81 },
  { name: "May", applicants: 95 },
  { name: "Jun", applicants: 100 },
]

export default function CompanyAdminDashboard() {
  const [timeRange, setTimeRange] = useState("This Month")

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Company Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Job Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offer Acceptance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+2% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobPostings.map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                  </div>
                  <Badge>{job.applicants} applicants</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applicant Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicantData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applicants" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobPostings.map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                  </div>
                  <Badge>{job.applicants} applicants</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Applicant Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplicants.map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{applicant.name}</p>
                    <p className="text-sm text-muted-foreground">{applicant.position}</p>
                  </div>
                  <Badge
                    variant={
                      applicant.status === "New"
                        ? "default"
                        : applicant.status === "Interviewed"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {applicant.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

