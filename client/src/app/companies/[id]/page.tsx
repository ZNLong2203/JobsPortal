"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Briefcase,
  Users,
  MapPin,
  DollarSign,
  // Globe,
  Building,
  Clock,
  Calendar,
  Star,
  CheckCircle2,
} from "lucide-react"
import { useCompanyDetailsAndJobs } from "@/hooks/useCompanyDetailsAndJobs"
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CompanyDetailsPage() {
  const params = useParams()
  const companyId = params.id as string
  const { data, isLoading, isError, error } = useCompanyDetailsAndJobs(companyId)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || "An error occurred"} />

  const { company } = data
  const jobsList = data.jobs || []

  if (!company) return <ErrorMessage message="Company not found" />

  const jobsByCategory = jobsList.reduce<Record<string, typeof jobsList>>((acc, job) => {
    const category = job.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(job)
    return acc
  }, {})

  const categories = Object.keys(jobsByCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 h-40 md:h-52">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto h-full flex items-end pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="bg-white p-2 rounded-lg shadow-lg -mb-20 md:-mb-16">
              <Image
                src={company.logo || "/placeholder.svg?height=120&width=120"}
                alt={`${company.name} logo`}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <div className="text-white md:border-b md:border-white md:border-opacity-20 md:pb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{company.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-white/20 hover:bg-white/30 text-white">{company.industry}</Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white">
                  <Users className="h-3 w-3 mr-1" />
                  {company.employees} employees
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16 md:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="jobs">Open Positions ({jobsList.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>About {company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{company.des}</p>

                    <Separator className="my-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Company Information</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Building className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Industry</p>
                              <p className="font-medium">{company.industry}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                              <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Company Size</p>
                              <p className="font-medium">{company.employees} employees</p>
                            </div>
                          </div>

                          {/* <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                              <Globe className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Website</p>
                              <a href="#" className="font-medium text-blue-600 hover:underline">
                                {company.website || "company.com"}
                              </a>
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-4">Location</h3>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <MapPin className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Headquarters</p>
                            <p className="font-medium">{company.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Why Join Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          icon: <Star className="h-5 w-5 text-yellow-500" />,
                          title: "Competitive Salary",
                          desc: "We offer industry-leading compensation packages",
                        },
                        {
                          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                          title: "Health Benefits",
                          desc: "Comprehensive health, dental, and vision coverage",
                        },
                        {
                          icon: <Clock className="h-5 w-5 text-blue-500" />,
                          title: "Flexible Hours",
                          desc: "Work-life balance is important to us",
                        },
                        {
                          icon: <Users className="h-5 w-5 text-purple-500" />,
                          title: "Great Team",
                          desc: "Collaborate with talented professionals",
                        },
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
                          <div className="mt-1">{benefit.icon}</div>
                          <div>
                            <h4 className="font-medium">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jobs">
                {categories.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No open positions available</h3>
                      <p className="text-gray-500 mt-2">Check back later for new opportunities</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-8">
                    {categories.map((category) => (
                      <div key={category}>
                        <h3 className="text-xl font-semibold mb-4">{category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {jobsByCategory[category].map((job) => (
                            <motion.div key={job._id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                              <Card className="h-full hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{job.name}</CardTitle>
                                    <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>
                                      {job.type}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent className="pb-2">
                                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <MapPin className="h-4 w-4" />
                                      <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <DollarSign className="h-4 w-4" />
                                      <span>${job.salary?.toLocaleString() || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Calendar className="h-4 w-4" />
                                      <span>{job.level}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Users className="h-4 w-4" />
                                      <span>{job.quantity} openings</span>
                                    </div>
                                  </div>
                                </CardContent>
                                <CardFooter>
                                  <Link href={`/jobs/${job._id}`} className="w-full">
                                    <Button className="w-full">View Job</Button>
                                  </Link>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Founded</p>
                    <p className="font-medium">2010</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employees</p>
                    <p className="font-medium">{company.employees}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Open Positions</p>
                    <p className="font-medium">{jobsList.length}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Location</h3>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <MapPin className="h-5 w-5 mx-auto mb-2 text-gray-500" />
                    <p className="text-sm">{company.address}</p>
                  </div>
                </div>

                <Separator />

                {/* <div>
                  <h3 className="font-semibold mb-3">Contact</h3>
                  <Button className="w-full">Visit Website</Button>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

