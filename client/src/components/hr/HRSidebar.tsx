'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Briefcase, FileText, Building } from 'lucide-react'

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/hr",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    href: "/hr/jobs",
    icon: Briefcase,
  },
  {
    title: "Resumes",
    href: "/hr/resumes",
    icon: FileText,
  },
  {
    title: "Company",
    href: "/hr/company",
    icon: Building,
  },
]

export function HRSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col h-screen border-r bg-gray-100/40 w-64">
      <div className="p-6">
        <h2 className="text-lg font-semibold">HR Dashboard</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-gray-200/60"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}

