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
import { Award, Trash2 } from "lucide-react"

const certificationSchema = z.object({
  name: z.string().min(2, { message: "Certification name must be at least 2 characters." }),
  issuer: z.string().min(2, { message: "Issuer must be at least 2 characters." }),
  year: z.string().regex(/^\d{4}$/, { message: "Year must be in YYYY format." }),
})

type Certification = z.infer<typeof certificationSchema>

export default function EditCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2022",
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google",
      year: "2021",
    },
  ])

  const form = useForm<Certification>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuer: "",
      year: "",
    },
  })

  const onSubmit = (values: Certification) => {
    setCertifications([...certifications, values])
    form.reset()
    toast.success("Certification added successfully")
  }

  const deleteCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    setCertifications(updatedCertifications)
    toast.success("Certification deleted successfully")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Certifications</h1>
        <Link href="/user/profile">
          <Button variant="outline">Back to Profile</Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certification Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuer</FormLabel>
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
              <Button type="submit">Add Certification</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-gray-600">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteCertification(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

