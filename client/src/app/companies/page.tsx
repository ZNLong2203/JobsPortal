'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, Briefcase, Users, MapPin } from 'lucide-react'

// Mock data for companies
const companies = [
  { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=100&width=100", industry: "Technology", employees: "1000-5000", location: "San Francisco, CA" },
  { id: 2, name: "FinanceHub", logo: "/placeholder.svg?height=100&width=100", industry: "Finance", employees: "500-1000", location: "New York, NY" },
  { id: 3, name: "GreenEnergy", logo: "/placeholder.svg?height=100&width=100", industry: "Energy", employees: "100-500", location: "Austin, TX" },
  { id: 4, name: "HealthPlus", logo: "/placeholder.svg?height=100&width=100", industry: "Healthcare", employees: "5000+", location: "Boston, MA" },
  { id: 5, name: "EduTech", logo: "/placeholder.svg?height=100&width=100", industry: "Education", employees: "100-500", location: "Seattle, WA" },
  { id: 6, name: "RetailGiant", logo: "/placeholder.svg?height=100&width=100", industry: "Retail", employees: "10000+", location: "Chicago, IL" },
]

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (industryFilter === 'all' || company.industry === industryFilter)
  )

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
            <SelectItem value="Energy">Energy</SelectItem>
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
          <Card key={company.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16 object-contain" />
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
                <span>{company.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Company</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

