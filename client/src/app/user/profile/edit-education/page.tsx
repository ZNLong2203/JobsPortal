"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { GraduationCap, Calendar, Trash2 } from "lucide-react"

const educationSchema = z.object({
  degree: z.string().min(2, { message: "Degree must be at least 2 characters." }),
  school: z.string().min(2, { message: "School must be at least 2 characters." }),
  year: z.string().regex(/^\d{4}$/, { message: "Year must be in YYYY format." }),
})

type Education = z.infer<typeof educationSchema>

export default function EditEducationPage() {
  const [educations, setEducations] = useState<Education[]>([
    {
      degree: "Master of Computer Science",
      school: "Tech University",
      year: "2018",
    },
    {
      degree: "Bachelor of Computer Science",
      school: "State University",
      year: "2016",
    },
  ])

  const form = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      school: "",
      year: "",
    },
  })

  const onSubmit = (values: Education) => {
    setEducations([...educations, values])
    form.reset()
    toast.success("Education added successfully")
  }

  const deleteEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    toast.success("Education deleted successfully")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Education</h1>
        <Link href="/user/profile">
          <Button variant="outline">Back to Profile</Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Education</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Education</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Education</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {educations.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      {edu.school}
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      {edu.year}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteEducation(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

