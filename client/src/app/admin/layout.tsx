import Link from 'next/link'
import { LayoutDashboard, Users, Briefcase, FileText, ShieldCheck, Key, UserCog, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="mt-4 space-y-1">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/companies">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Companies
            </Button>
          </Link>
          <Link href="/admin/jobs">
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              Jobs
            </Button>
          </Link>
          <Link href="/admin/resumes">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Resumes
            </Button>
          </Link>
          <Link href="/admin/roles">
            <Button variant="ghost" className="w-full justify-start">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Roles
            </Button>
          </Link>
          <Link href="/admin/permissions">
            <Button variant="ghost" className="w-full justify-start">
              <Key className="mr-2 h-4 w-4" />
              Permissions
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start">
              <UserCog className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Admin Settings
            </Button>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

