import { } from 'next/navigation'
import AdminSidebar from './components/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, you would check the user's role here
  // const user = await getCurrentUser()
  // if (user?.role !== 'admin') redirect('/')

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  )
}

