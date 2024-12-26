import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { MapPin, Briefcase } from 'lucide-react'

export default function JobListings() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <Input type="text" placeholder="Job title or keyword" />
            <Input type="text" placeholder="Location" />
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Experience Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="space-y-6">
            <JobListing 
              title="Software Engineer"
              company="TechCorp"
              location="San Francisco, CA"
              type="Full-time"
              description="We are seeking a talented Software Engineer to join our dynamic team..."
            />
            <JobListing 
              title="Marketing Manager"
              company="BrandBoost"
              location="New York, NY"
              type="Full-time"
              description="BrandBoost is looking for an experienced Marketing Manager to lead our marketing efforts..."
            />
            <JobListing 
              title="Data Analyst"
              company="DataInsights"
              location="Chicago, IL"
              type="Contract"
              description="Join our data team to help derive meaningful insights from complex datasets..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function JobListing({ title, company, location, type, description }: { 
  title: string, 
  company: string, 
  location: string, 
  type: string, 
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{company}</p>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center text-gray-500">
          <MapPin className="mr-1 h-4 w-4" /> {location}
        </div>
        <div className="flex items-center text-gray-500">
          <Briefcase className="mr-1 h-4 w-4" /> {type}
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <Button>Apply Now</Button>
    </div>
  )
}

