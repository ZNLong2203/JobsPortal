'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart as RechartsBarChart, Bar } from 'recharts'
import { useAdminStatistics } from "@/hooks/useStatistics"
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"

export default function AdminDashboard() {
  const { data: statistics, isLoading, isError } = useAdminStatistics()

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message="Failed to load dashboard statistics" />

  interface MonthlyJobData {
    month: number;
    year: number;
    total: number;
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const jobApplicationsData = statistics.jobsAppliedByMonth.map((item: MonthlyJobData) => ({
    name: monthNames[item.month - 1],
    applications: item.total,
    year: item.year
  }))

  interface CategoryData {
    _id: string;
    total: number;
  }

  interface TransformedCategoryData {
    name: string;
    jobs: number;
  }

  const jobCategoriesData: TransformedCategoryData[] = statistics.jobsDistributionByCategory.map((item: CategoryData) => ({
    name: item._id,
    jobs: item.total
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Companies" 
          value={statistics.totalCompanies.toString()} 
          icon={<Users className="h-8 w-8" />} 
        />
        <DashboardCard 
          title="Active Jobs" 
          value={statistics.totalJobs.toString()} 
          icon={<Briefcase className="h-8 w-8" />} 
        />
        <DashboardCard 
          title="Total Users" 
          value={statistics.totalUsers.toString()} 
          icon={<Users className="h-8 w-8" />} 
        />
        <DashboardCard 
          title="Resumes Submitted" 
          value={statistics.totalResumes.toString()} 
          icon={<FileText className="h-8 w-8" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Applications Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobApplicationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tickFormatter={(value, index) => `${value} ${jobApplicationsData[index]?.year}`}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label, items) => {
                    const item = items[0]?.payload
                    return item ? `${label} ${item.year}` : label
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Applications"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={jobCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#82ca9d" name="Jobs" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

