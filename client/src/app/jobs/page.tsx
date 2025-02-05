'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useJobs } from "@/hooks/useJobs"
import { Job } from "@/types/job"
import { MapPin, Briefcase } from 'lucide-react'
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"
import { Pagination } from "@/components/common/Pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const JOB_TYPES = {
  ALL: 'all',
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract'
} as const;

const JOB_LEVELS = {
  ALL: 'all',
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior'
} as const;

export default function JobListings() {
  const limit = 10
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    level: ''
  })

  const { jobs: jobsData, isLoading, isError, error } = useJobs(page, limit, filters)
  const jobsList = Array.isArray(jobsData) ? jobsData : jobsData?.jobs ?? []
  const metadata = Array.isArray(jobsData) ? null : jobsData?.metadata ?? null

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    setPage(1) 
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || 'Error loading jobs'} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <Input 
              type="text" 
              placeholder="Job title or keyword"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <Input 
              type="text" 
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={JOB_TYPES.ALL}>All Types</SelectItem>
                <SelectItem value={JOB_TYPES.FULL_TIME}>Full-time</SelectItem>
                <SelectItem value={JOB_TYPES.PART_TIME}>Part-time</SelectItem>
                <SelectItem value={JOB_TYPES.CONTRACT}>Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.level} onValueChange={(value) => handleFilterChange('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={JOB_LEVELS.ALL}>All Levels</SelectItem>
                <SelectItem value={JOB_LEVELS.ENTRY}>Entry Level</SelectItem>
                <SelectItem value={JOB_LEVELS.MID}>Mid Level</SelectItem>
                <SelectItem value={JOB_LEVELS.SENIOR}>Senior Level</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
        <div className="md:col-span-3">
          {jobsList.length === 0 ? (
            <p>No jobs found matching your criteria</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobsList.map((job: Job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
              {metadata && (
                <div className="mt-8">
                  <Pagination
                    currentPage={page}
                    totalPages={metadata.totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{job.name}</h3>
      <p className="text-gray-600 mb-4">{typeof job.company === 'string' ? job.company : job.company.name}</p>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center text-gray-500">
          <MapPin className="mr-1 h-4 w-4" /> {job.location}
        </div>
        <div className="flex items-center text-gray-500">
          <Briefcase className="mr-1 h-4 w-4" /> {job.type}
        </div>
      </div>
      <p className="text-gray-700 mb-4">{job.des}</p>
      <Button>Apply Now</Button>
    </div>
  )
}
