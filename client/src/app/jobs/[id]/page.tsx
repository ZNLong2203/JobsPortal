"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Clock,
  Users,
  ChevronRight,
  Building,
  GraduationCap,
} from "lucide-react";
import { useJobDetails } from "@/hooks/useJobs";
import { LoadingSpinner } from "@/components/common/IsLoading";
import { ErrorMessage } from "@/components/common/IsError";
import { MessageContent } from "@/components/common/MessageContext";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { useResumes } from "@/hooks/useResumes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  resume: z.instanceof(File, { message: "Please upload your resume." }),
  coverLetter: z.string().min(5, { message: "Cover letter must be at least 5 characters." }),
});

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data: job, isLoading, isError, error } = useJobDetails(jobId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
  });

  const { createResume, isUploading } = useResumes();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error?.message || "An error occurred"} />;
  if (!job) return <ErrorMessage message="Job not found" />;

  function onSubmit(values: z.infer<typeof formSchema>) {
    createResume(
      {
        resumeData: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          coverLetter: values.coverLetter,
          status: "pending", 
          job: jobId,
          user: userInfo?._id || '', 
          company: job && typeof job.company === "object" && job.company._id ? job.company._id : "companyId", // replace with actual company ID
          url: "resumeUrl", 
        },
        file: values.resume,
      },
      {
        onSuccess: () => {
          toast.success("Application submitted successfully!");
          form.reset();
          setIsDialogOpen(false);
        },
        onError: (err: Error) => {
          console.error("Error submitting application:", err);
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        },
      }
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center text-sm text-gray-500">
          <span>Jobs</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>
            <Link href={`/companies/${typeof job.company === "object" ? job.company._id : job.company}`}>
              {typeof job.company === "object" ? job.company.name : job.company}
            </Link>
          </span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-semibold text-gray-900">{job.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
                <div className="absolute bottom-0 left-6 transform translate-y-1/2 bg-white p-2 rounded-lg shadow-md">
                  <Link href={`/companies/${typeof job.company === "object" ? job.company._id : job.company}`}>
                    <Image
                      src={
                        typeof job.company === "object"
                          ? job.company.logo || "/placeholder.svg"
                          : "/placeholder.svg"
                      }
                      alt={`${typeof job.company === "object" ? job.company.name : job.company} logo`}
                      className="w-24 h-24 object-contain"
                      width={96}
                      height={96}
                    />
                  </Link>
                </div>
              </div>

              <CardHeader className="pt-16">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">{job.name}</CardTitle>
                    <p className="text-xl text-gray-600">
                      <Link href={`/companies/${typeof job.company === "object" ? job.company._id : job.company}`}>
                        {typeof job.company === "object" ? job.company.name : job.company}
                      </Link>
                    </p>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="ml-4" size="lg">
                        <FileText className="mr-2 h-5 w-5" /> Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Apply for {job.name}</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to apply for this position. We&apos;ll get back to you as soon as possible.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
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
                                  <Input type="email" {...field} />
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="resume"
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem>
                                <FormLabel>Upload Resume</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                      onChange(e.target.files ? e.target.files[0] : null)
                                    }
                                    {...field}
                                    value={undefined}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="coverLetter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cover Letter</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    rows={5}
                                    placeholder="Tell us why you're a great fit for this position..."
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={isUploading}>
                            {isUploading ? "Submitting..." : "Submit Application"}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-500 mb-2" />
                    <span className="text-sm text-center">{job.location}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-500 mb-2" />
                    <span className="text-sm text-center">{job.type}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-500 mb-2" />
                    <span className="text-sm text-center">{job.salary.toLocaleString()}/year</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-500 mb-2" />
                    <span className="text-sm text-center">
                      {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Date not available"}
                    </span>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-bold mb-3">Job Description</h3>
                    <MessageContent content={job.des} />
                  </section>
                  <section>
                    <h3 className="text-xl font-bold mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
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
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Company Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-blue-500" />
                  <span>{typeof job.company === "object" ? job.company.name : job.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                  <span>500+ employees</span>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">About the company</h4>
                  <p className="text-sm text-gray-600">
                    {typeof job.company === "object" && job.company.des
                      ? job.company.des
                      : "A leading company in the industry, committed to innovation and growth."}
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Culture & Benefits</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Flexible working hours</li>
                    <li>Health insurance</li>
                    <li>Professional development</li>
                    <li>Team building events</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
