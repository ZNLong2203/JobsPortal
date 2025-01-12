import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, FileText, Building, BarChart2 } from 'lucide-react'

export default function HRDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">HR Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Active Jobs"
          value="24"
          icon={<Briefcase className="h-8 w-8" />}
          link="/hr/jobs"
        />
        <DashboardCard
          title="New Applications"
          value="156"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button asChild>
              <Link href="/hr/jobs/new">
                <Briefcase className="mr-2 h-4 w-4" /> Post New Job
              </Link>
            </Button>
            <Button asChild>
              <Link href="/hr/company/edit">
                <Building className="mr-2 h-4 w-4" /> Edit Company Info
              </Link>
            </Button>
            <Button asChild>
              <Link href="/hr/reports">
                <BarChart2 className="mr-2 h-4 w-4" /> View Reports
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-blue-500" />
                <span>New application for <strong>Senior Developer</strong></span>
              </li>
              <li className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-purple-500" />
                <span>New job posted: <strong>UX Designer</strong></span>
              </li>
              <li className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-green-500" />
                <span>Company information updated</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon, link }: { title: string; value: string; icon: React.ReactNode; link: string }) {
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

