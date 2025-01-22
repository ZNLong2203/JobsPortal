"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, MapPin, DollarSign, Calendar, FileText, Clock, Users, ChevronRight } from "lucide-react"
import { useJobDetails } from "@/hooks/useJobs"
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function JobDetailsPage() {
  const params = useParams()
  const jobId = params.id as string
  const { data: job, isLoading, isError, error } = useJobDetails(jobId)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [resume, setResume] = useState<File | null>(null)
  const [coverLetter, setCoverLetter] = useState("")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error?.message || "An error occurred"} />

  if (!job) return <ErrorMessage message="Job not found" />

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted", { name, email, phone, resume, coverLetter })
    // You would typically send this data to your backend
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center text-sm text-gray-500">
          <span>Jobs</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>{typeof job.company === "object" ? job.company.name : job.company}</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-semibold text-gray-900">{job.name}</span>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <CardHeader className="relative">
            <div className="absolute -top-16 left-6 bg-white p-2 rounded-lg shadow-md">
              <Image
                src={typeof job.company === "object" ? job.company.logo || "/placeholder.svg" : "/placeholder.svg"}
                alt={`${typeof job.company === "object" ? job.company.name : job.company} logo`}
                className="w-24 h-24 object-contain"
                width={96}
                height={96}
              />
            </div>
            <div className="ml-36">
              <CardTitle className="text-3xl mb-2">{job.name}</CardTitle>
              <p className="text-xl text-gray-600">
                {typeof job.company === "object" ? job.company.name : job.company}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <span>${job.salary.toLocaleString()}/year</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>
                  Posted on: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Date not available"}
                </span>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-bold mb-3">Job Description</h3>
                <p className="text-gray-700 leading-relaxed">{job.des}</p>
              </section>
              <section>
                <h3 className="text-xl font-bold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xl font-bold mb-3">Additional Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span>Full-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Team of 10-15 people</span>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Apply for this position</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Upload Resume</Label>
                <Input
                  id="resume"
                  type="file"
                  onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                  placeholder="Tell us why you're a great fit for this position..."
                />
              </div>
              <Button type="submit" className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

