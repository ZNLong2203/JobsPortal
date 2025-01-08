'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart as RechartsBarChart, Bar } from 'recharts'

const jobApplicationsData = [
  { name: 'Jan', applications: 400 },
  { name: 'Feb', applications: 300 },
  { name: 'Mar', applications: 500 },
  { name: 'Apr', applications: 280 },
  { name: 'May', applications: 200 },
  { name: 'Jun', applications: 600 },
  { name: 'Jul', applications: 400 },
]

const jobCategoriesData = [
  { name: 'Technology', jobs: 1234 },
  { name: 'Marketing', jobs: 876 },
  { name: 'Sales', jobs: 765 },
  { name: 'Finance', jobs: 543 },
  { name: 'HR', jobs: 432 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Companies" value="150" icon={<Users className="h-8 w-8" />} />
        <DashboardCard title="Active Jobs" value="1,234" icon={<Briefcase className="h-8 w-8" />} />
        <DashboardCard title="Resumes Submitted" value="5,678" icon={<FileText className="h-8 w-8" />} />
        <DashboardCard title="Total Revenue" value="$50,234" icon={<DollarSign className="h-8 w-8" />} />
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#8884d8" activeDot={{ r: 8 }} />
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
                <Bar dataKey="jobs" fill="#82ca9d" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between border-b pb-2">
              <span>New company registered: Tech Innovators Inc.</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>New job posted: Senior React Developer</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>User John Doe updated their resume</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>New application received for: Marketing Manager</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
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

