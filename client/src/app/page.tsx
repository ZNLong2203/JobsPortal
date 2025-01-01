import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, Building2, ClapperboardIcon as ChalkboardTeacher, Code, Stethoscope, Utensils } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Find Your Dream Job</h1>
        <div className="max-w-3xl mx-auto mb-12">
          <form className="flex space-x-4">
            <Input type="text" placeholder="Job title, keywords, or company" className="flex-grow" />
            <Input type="text" placeholder="City, state, or zip code" className="flex-grow" />
            <Button type="submit" size="lg">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <JobCategory icon={<Code />} title="Technology" jobCount={1234} />
          <JobCategory icon={<Briefcase />} title="Business" jobCount={987} />
          <JobCategory icon={<Building2 />} title="Finance" jobCount={765} />
          <JobCategory icon={<ChalkboardTeacher />} title="Education" jobCount={543} />
          <JobCategory icon={<Stethoscope />} title="Healthcare" jobCount={432} />
          <JobCategory icon={<Utensils />} title="Hospitality" jobCount={321} />
        </div>
      </div>
    </div>
  )
}

function JobCategory({ icon, title, jobCount }: { icon: React.ReactNode, title: string, jobCount: number }) {
  return (
    <Link href={`/jobs?category=${title.toLowerCase()}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{jobCount} jobs available</p>
    </Link>
  )
}

