"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Briefcase, Calendar, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUserProfile } from "@/hooks/useUserProfile";

const experienceSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  startDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  endDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

type Experience = z.infer<typeof experienceSchema>;

export default function EditExperiencePage() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { profile, updateProfile } = useUserProfile(userInfo?._id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: Experience) => {
    if (!profile) return;

    setIsSubmitting(true);
    const newExperience = [...(profile.experience || []), values];

    try {
      await updateProfile({
        userId: userInfo?._id,
        experience: newExperience,
      });
      toast.success("Experience added successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to add experience: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!profile) return;

    const updatedExperience = profile.experience.filter((_, i) => i !== index);

    try {
      await updateProfile({
        userId: userInfo?._id,
        experience: updatedExperience,
      });
      toast.success("Experience deleted successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to delete experience: ${errorMessage}`);
    }
  };

  const form = useForm<Experience>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
    },
  });

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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
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
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="month"
                          value={field.value instanceof Date ? field.value.toISOString().slice(0, 7) : new Date(field.value).toISOString().slice(0, 7)}
                        />
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
                        <Input 
                          {...field} 
                          type="month" 
                          value={field.value instanceof Date ? field.value.toISOString().slice(0, 7) : new Date(field.value).toISOString().slice(0, 7)}
                        />
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Experience"}
              </Button>
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
            {profile?.experience?.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 border-gray-200 pl-4 ml-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {exp.company}
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      {new Date(exp.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(index)}
                  >
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
  );
}
