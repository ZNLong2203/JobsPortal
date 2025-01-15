'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Building, Mail, Phone, MapPin, Globe, Users, Calendar } from 'lucide-react'
import { Company } from '@/types/company'
import { useCompany, useCompanies } from '@/hooks/useCompanies'
import { ErrorMessage } from '@/components/common/IsError'
import { LoadingSpinner } from '@/components/common/IsLoading'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function CompanyInformation() {
  const companyId = "677be5f93348df6068c32e67";
  const { data: companyData, isLoading, isError, error } = useCompany(companyId)
  const { updateCompany } = useCompanies()

  const [company, setCompany] = useState<Company>({
    name: '',
    industry: '',
    des: '',
    employees: 0,
    address: '',
    logo: '',
  })

  useEffect(() => {
    if (companyData) {
      setCompany(companyData)
    }
  }, [companyData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateCompany({ company }, {
      onSuccess: () => {
        toast.success('Company information updated successfully')
      },
      onError: (error: Error) => {
        toast.error(`Failed to update company information: ${error.message}`)
      }
    })
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || 'Error loading company'} />

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Company Information</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={company.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={company.industry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="des">Company Description</Label>
                <Textarea
                  id="des"
                  name="description"
                  value={company.des}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  name="foundedYear"
                  value={company.foundedYear}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  name="employees"
                  value={company.employees}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Logo</Label>
                <Image 
                  src={company.logo}
                  alt={company.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={company.email}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={company.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span>{company.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{company.email}</span>
              </div> */}
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span>{company.employees} employees</span>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>Founded in {company.foundedYear}</span>
              </div> */}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" size="lg">
            Update Company Information
          </Button>
        </div>
      </form>
    </div>
  )
}

