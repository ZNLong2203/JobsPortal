"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar, Languages, Award, Pencil } from "lucide-react"
import { toast } from "react-hot-toast"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }),
  skills: z.string().refine((value) => value.split(",").every((skill) => skill.trim().length > 0), {
    message: "Each skill must be non-empty.",
  }),
  languages: z.string().refine((value) => value.split(",").every((language) => language.trim().length > 0), {
    message: "Each language must be non-empty.",
  }),
})

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Experienced software engineer with a passion for building user-friendly applications.",
    experience: [
      {
        id: 1,
        role: "Senior Software Engineer",
        company: "Tech Corp",
        period: "2020 - Present",
        description: "Leading development of core products and mentoring junior developers.",
      },
      {
        id: 2,
        role: "Software Engineer",
        company: "StartUp Inc",
        period: "2018 - 2020",
        description: "Developed and maintained multiple web applications.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Master of Computer Science",
        school: "Tech University",
        year: "2018",
      },
      {
        id: 2,
        degree: "Bachelor of Computer Science",
        school: "State University",
        year: "2016",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      skills: user.skills.join(", "),
      languages: user.languages.join(", "),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUser((prevUser) => ({
      ...prevUser,
      ...values,
      skills: values.skills.split(",").map((skill) => skill.trim()),
      languages: values.languages.split(",").map((language) => language.trim()),
    }))
    setIsEditModalOpen(false)
    toast.success("Profile updated successfully")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {user.location}
                </div>
                <div className="w-full space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.phone}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="space-y-2">
                  {user.languages.map((language) => (
                    <div key={language} className="flex items-center text-gray-600">
                      <Languages className="h-4 w-4 mr-2" />
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Profile</h1>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Edit Profile
                  <Pencil className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills (comma-separated)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages (comma-separated)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save changes</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{user.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Work Experience</CardTitle>
                  <Link href="/user/profile/edit-experience">
                    <Button variant="outline">
                      Edit Experience
                      <Pencil className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {user.experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-gray-200 pl-4 ml-2">
                        <h3 className="text-lg font-semibold">{exp.role}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {exp.company}
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-2" />
                          {exp.period}
                        </div>
                        <p className="text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  <Link href="/user/profile/edit-education">
                    <Button variant="outline">
                      Edit Education
                      <Pencil className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {user.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-gray-200 pl-4 ml-2">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <div className="flex items-center text-gray-600">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          {edu.school}
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-2" />
                          {edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Certifications</CardTitle>
                  <Link href="/user/profile/edit-certifications">
                    <Button variant="outline">
                      Edit Certifications
                      <Pencil className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-2" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

