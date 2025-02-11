"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { Briefcase, Calendar, Trash2 } from "lucide-react"

const experienceSchema = z.object({
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, { message: "Start date must be in YYYY-MM format." }),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, { message: "End date must be in YYYY-MM format." })
    .or(z.literal("Present")),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
})

type Experience = z.infer<typeof experienceSchema>

export default function EditExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      role: "Senior Software Engineer",
      company: "Tech Corp",
      startDate: "2020-01",
      endDate: "Present",
      description: "Leading development of core products and mentoring junior developers.",
    },
    {
      role: "Software Engineer",
      company: "StartUp Inc",
      startDate: "2018-03",
      endDate: "2019-12",
      description: "Developed and maintained multiple web applications.",
    },
  ])

  const form = useForm<Experience>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  })

  const onSubmit = (values: Experience) => {
    setExperiences([...experiences, values])
    form.reset()
    toast.success("Experience added successfully")
  }

  const deleteExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    toast.success("Experience deleted successfully")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Work Experience</h1>
        <Link href="/user/profile">
          <Button variant="outline">Back to Profile</Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Experience</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {exp.company}
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteExperience(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

