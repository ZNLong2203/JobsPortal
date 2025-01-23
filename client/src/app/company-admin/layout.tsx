"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Users, LayoutDashboard, Building } from "lucide-react"

export default function CompanyAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/company-admin" },
    { icon: Users, label: "Manage HR", href: "/company-admin/manage-hr" },
    { icon: Briefcase, label: "Job Postings", href: "/company-admin/job-postings" },
    { icon: Building, label: "Company", href: "/company-admin/company" },
  ]

  return (
    <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-white">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Company Admin</h2>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}

