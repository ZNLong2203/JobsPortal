import Link from 'next/link'
import { Building, Users, LayoutDashboard } from 'lucide-react'

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="space-y-2">
        <Link
          href="/admin"
          className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/companies"
          className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800"
        >
          <Building size={20} />
          <span>Companies</span>
        </Link>
        <Link
          href="/admin/hr-managers"
          className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800"
        >
          <Users size={20} />
          <span>HR Managers</span>
        </Link>
      </nav>
    </div>
  )
}

export default AdminSidebar

