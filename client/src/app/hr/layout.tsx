import { HRSidebar } from '@/components/hr/HRSidebar'

export default function HRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <HRSidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8">
          {children}
        </div>
      </div>
    </div>
  )
}
