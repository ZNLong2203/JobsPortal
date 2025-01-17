/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Building, Users, UserPlus, DollarSign, Calendar, Award, Smile } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

// Mock data for the charts
const employeeStatusData = [
  { name: 'Full-time', value: 300 },
  { name: 'Part-time', value: 50 },
  { name: 'Contract', value: 100 },
]

const recruitmentData = [
  { name: 'Jan', applications: 65, hires: 4 },
  { name: 'Feb', applications: 80, hires: 5 },
  { name: 'Mar', applications: 90, hires: 6 },
  { name: 'Apr', applications: 81, hires: 5 },
  { name: 'May', applications: 95, hires: 7 },
  { name: 'Jun', applications: 100, hires: 8 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function HRDashboard() {
  const [activeJobs, setActiveJobs] = useState(24)
  const [newApplications, setNewApplications] = useState(156)
  const [totalEmployees, setTotalEmployees] = useState(450)
  const [newHires, setNewHires] = useState(35)
  const [turnoverRate, setTurnoverRate] = useState(2.5)

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">HR Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Active Jobs"
          value={activeJobs}
          icon={<Briefcase className="h-8 w-8" />}
          link="/hr/jobs"
        />
        <DashboardCard
          title="New Applications"
          value={newApplications}
          icon={<FileText className="h-8 w-8" />}
          link="/hr/resumes"
        />
        <DashboardCard
          title="Company Info"
          value="View"
          icon={<Building className="h-8 w-8" />}
          link="/hr/company"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Employee Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employeeStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {employeeStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recruitment Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recruitmentData}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="applications" fill="#8884d8" name="Applications" />
                <Bar yAxisId="right" dataKey="hires" fill="#82ca9d" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Employees"
          value={totalEmployees}
          icon={<Users className="h-6 w-6" />}
        />
        <MetricCard
          title="New Hires (This Month)"
          value={newHires}
          icon={<UserPlus className="h-6 w-6" />}
        />
        <MetricCard
          title="Turnover Rate"
          value={`${turnoverRate}%`}
          icon={<DollarSign className="h-6 w-6" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TeamOverviewCard
              title="Upcoming Birthdays"
              value="3"
              description="This week"
              icon={<Calendar className="h-8 w-8 text-blue-500" />}
            />
            <TeamOverviewCard
              title="Work Anniversaries"
              value="2"
              description="Next month"
              icon={<Award className="h-8 w-8 text-green-500" />}
            />
            <TeamOverviewCard
              title="Team Satisfaction"
              value="4.2"
              description="Out of 5"
              icon={<Smile className="h-8 w-8 text-yellow-500" />}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function DashboardCard({ title, value, icon, link }: { title: string; value: string | number; icon: React.ReactNode; link: string }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      </CardContent>
      <CardContent className="bg-gray-50 py-2 px-6">
        <Link href={link} className="text-sm text-blue-600 hover:underline">View Details</Link>
      </CardContent>
    </Card>
  )
}

function MetricCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      </CardContent>
    </Card>
  )
}

function TeamOverviewCard({ title, value, description, icon }: { title: string; value: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

