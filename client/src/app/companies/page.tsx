'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, Briefcase, Users, MapPin } from 'lucide-react'
import { useCompanies } from '@/hooks/useCompanies'
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'
import { Pagination } from "@/components/common/Pagination"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [page, setPage] = useState(1)
  const { companies: companiesData, isLoading, isError, error } = useCompanies(page)
  const companiesList = Array.isArray(companiesData) ? companiesData : companiesData?.companies ?? []
  const metadata = Array.isArray(companiesData) ? null : companiesData?.metadata ?? null

  const filteredCompanies = companiesList?.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (industryFilter === 'all' || company.industry === industryFilter)
  ) || []

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || 'An error occurred'} />

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Companies</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <SearchIcon className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => (
          <Card key={company._id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <img src={company.logo || "/placeholder.svg"} alt={`${company.name} logo`} className="w-16 h-16 object-contain" />
              <CardTitle>{company.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Briefcase className="h-4 w-4" />
                <span>{company.industry}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Users className="h-4 w-4" />
                <span>{company.employees} employees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{company.address}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/companies/${company._id}`}>View Company</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {metadata && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={metadata?.page}
            totalPages={metadata?.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}

