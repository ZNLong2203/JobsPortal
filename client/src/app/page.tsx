import JobSearch from '@/components/common/JobSearch'
import JobCard from '@/components/common/JobCard'
import { ArrowRight } from 'lucide-react'

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Co', location: 'San Francisco, CA', salary: '$100,000 - $150,000' },
  { id: 2, title: 'Data Analyst', company: 'Data Inc', location: 'New York, NY', salary: '$80,000 - $120,000' },
  { id: 3, title: 'Product Manager', company: 'Product Labs', location: 'Austin, TX', salary: '$90,000 - $140,000' },
]

export default function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-600 text-white py-20 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Discover thousands of job opportunities with top companies
          </p>
          <JobSearch />
        </div>
      </section>
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Jobs</h2>
          <a href="/jobs" className="text-primary hover:underline flex items-center">
            View all jobs <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  )
}

