"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Briefcase, Globe, CheckCircle } from "lucide-react"
import { useCompanies } from "@/hooks/useCompanies"
import { useUsers } from "@/hooks/useUsers"
import Link from "next/link"
import { LoadingSpinner } from "@/components/common/IsLoading"
import { ErrorMessage } from "@/components/common/IsError"
import toast from "react-hot-toast"
import { UpdateUser } from "@/types/user"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { DeclareRole } from "@/utils/declareRole"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  industry: z.string().min(2, {
    message: "Please select an industry.",
  }),
  employees: z.number().min(1, {
    message: "Number of employees must be at least 1.",
  }),
  logo: z
    .string()
    .url({
      message: "Please enter a valid URL for the logo.",
    })
    .optional(),
  des: z.string().min(10, {
    message: "Company description must be at least 10 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL for the website.",
  }).or(z.literal('')),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }).or(z.literal('')),
})

export default function RegisterCompanyPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { createCompany, isLoading, isError, error } = useCompanies()
  const { updateUser } = useUsers()
  const [step, setStep] = useState(1)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      industry: "",
      employees: 1,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3KRLQ-4_EdCiWdQ5WVmZBhS4HCHiTxV71A&s",
      des: "",
      website: "",
      contactEmail: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCompany(values, {
      onSuccess: (data) => {
        const userUpdate: UpdateUser = {
          _id: userInfo?._id || "",
          company: data._id,
          role: DeclareRole.CompanyAdmin,
        };
        
        updateUser({ user: userUpdate }, {
          onSuccess: () => {
            setStep(4);
            toast.success('Company registered successfully');
          },
          onError: (error: Error) => {
            toast.error(`Failed to update user: ${error.message}`);
          }
        });
      },
      onError: (error: Error) => {
        toast.error(`Failed to create company: ${error.message}`);
      }
    });
  }

  const steps = [
    { icon: Building, title: "Company Info" },
    { icon: Briefcase, title: "Industry & Details" },
    { icon: Globe, title: "Contact & Web" },
  ]

  if(isLoading) return <LoadingSpinner />
  if(isError) return <ErrorMessage message={error?.message || "An error occurred while fetching jobs"} />

  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Become an Employer</h1>
        <p className="text-xl text-gray-600">Start hiring top talent for your company today</p>
      </motion.div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Register Your Company</CardTitle>
          <CardDescription>Fill out the form below to get started</CardDescription>
        </CardHeader>
        <CardContent>
          {step < 4 && (
            <div className="flex justify-between mb-8">
              {steps.map((s, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${index < step ? "text-primary" : "text-gray-400"}`}
                >
                  <div className={`rounded-full p-2 ${index < step ? "bg-primary text-white" : "bg-gray-200"}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-2">{s.title}</span>
                </div>
              ))}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your company address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="des"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Briefly describe your company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Logo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/logo.png" {...field} />
                        </FormControl>
                        <FormDescription>Leave blank to use default logo</FormDescription>
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
                  <p className="text-gray-600 mb-4">
                    Your company has been registered successfully. You can now start posting jobs and managing your
                    company profile.
                  </p>
                  <Button>
                    <Link href={"/company-admin"}> Go to Company Dashboard </Link>
                  </Button>
                </motion.div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          {step < 3 && <Button onClick={() => setStep(step + 1)}>Next</Button>}
          {step === 3 && (
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

