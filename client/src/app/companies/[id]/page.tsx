'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, MapPin, DollarSign } from 'lucide-react'
import { useCompanyDetailsAndJobs } from '@/hooks/useCompanyDetailsAndJobs'
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'
import Link from 'next/link'

export default function CompanyDetailsPage() {
  const params = useParams()
  const companyId = params.id as string
  const { data, isLoading, isError, error } = useCompanyDetailsAndJobs(companyId)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || 'An error occurred'} />

  const { company } = data
  const jobsList = data.jobs || []

  if (!company) return <ErrorMessage message="Company not found" />

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <img src={company.logo || "/placeholder.svg"} alt={`${company.name} logo`} className="w-24 h-24 object-contain" />
          <div>
            <CardTitle className="text-3xl">{company.name}</CardTitle>
            <p className="text-gray-600">{company.industry}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span>{company.employees} employees</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{company.address}</span>
            </div>
          </div>
          <p className="text-gray-700">{company.des}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Open Positions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsList.length === 0 ? (
          <p>No open positions available</p>
        ) : (
          jobsList.map(job => (
            <Card key={job._id}>
              <CardHeader>
                <CardTitle>{job.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>${job.salary?.toLocaleString() || 'N/A'}/year</span>
                </div>
              </CardContent>
              <CardContent>
                <Link href={`/jobs/${job._id}`}>
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
