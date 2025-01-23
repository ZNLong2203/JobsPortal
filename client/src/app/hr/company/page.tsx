"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import type { Company } from "@/types/company"
import { useSelector } from "react-redux"
import { useCompany } from "@/hooks/useCompanies"
import { ErrorMessage } from "@/components/common/IsError"
import { LoadingSpinner } from "@/components/common/IsLoading"
import Image from "next/image"
import type { RootState } from "@/redux/store"

export default function CompanyInformation() {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { data: companyData, isLoading, isError, error } = useCompany(userInfo?.company || "")

  const [company, setCompany] = useState<Company>({
    name: "",
    industry: "",
    des: "",
    employees: 0,
    address: "",
    logo: "",
  })

  useEffect(() => {
    if (companyData) {
      setCompany(companyData)
    }
  }, [companyData])

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || "Error loading company"} />

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src={company.logo && company.logo.trim() !== "" ? company.logo : "/placeholder.svg"}
              alt={`${company.name || "Company"} logo`}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-3xl">{company.name || "Company Name"}</CardTitle>
            <p className="text-gray-600">{company.industry || "Industry"}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Company Name</h3>
                  <p>{company.name}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Industry</h3>
                  <p>{company.industry}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Company Description</h3>
                  <p className="whitespace-pre-wrap">{company.des}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Number of Employees</h3>
                  <p>{company.employees}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Company Logo</h3>
                  <Image
                    src={company.logo && company.logo.trim() !== "" ? company.logo : "/placeholder.svg"}
                    alt={company.name || "Placeholder"}
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
                <div className="space-y-2">
                  <h3 className="font-medium">Address</h3>
                  <p className="whitespace-pre-wrap">{company.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>{company.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>{company.employees} employees</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

