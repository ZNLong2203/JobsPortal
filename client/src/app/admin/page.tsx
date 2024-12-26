import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { BarChart, Users, Briefcase, FileText } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Companies" value="150" icon={<Users className="h-8 w-8" />} />
        <DashboardCard title="Active Jobs" value="1,234" icon={<Briefcase className="h-8 w-8" />} />
        <DashboardCard title="Resumes Submitted" value="5,678" icon={<FileText className="h-8 w-8" />} />
        <DashboardCard title="Applications" value="10,234" icon={<BarChart className="h-8 w-8" />} />
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

