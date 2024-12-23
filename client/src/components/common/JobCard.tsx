import Link from 'next/link'
import { MapPin, DollarSign, Clock } from 'lucide-react'

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
}

interface JobCardProps {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-4">{job.company}</p>
      <div className="flex items-center text-gray-500 mb-2">
        <MapPin size={18} className="mr-2" />
        <span>{job.location}</span>
      </div>
      <div className="flex items-center text-gray-500 mb-4">
        <DollarSign size={18} className="mr-2" />
        <span>{job.salary}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 flex items-center">
          <Clock size={16} className="mr-1" />
          Posted 2 days ago
        </span>
        <Link href={`/jobs/${job.id}`} className="text-primary hover:text-secondary transition-colors">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default JobCard

