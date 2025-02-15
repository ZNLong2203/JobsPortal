"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { GraduationCap, Calendar, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUserProfile } from "@/hooks/useUserProfile";

const educationSchema = z.object({
  degree: z.string().min(2, { message: "Degree must be at least 2 characters." }),
  school: z.string().min(2, { message: "School must be at least 2 characters." }),
  field: z.string().min(2, { message: "Field must be at least 2 characters." }),
  startYear: z.string().regex(/^\d{4}$/, { message: "Start Year must be in YYYY format." }),
  endYear: z.string().regex(/^\d{4}$/, { message: "End Year must be in YYYY format." }),
});

type EducationFormValues = z.infer<typeof educationSchema>;

export default function EditEducationPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { profile, updateProfile } = useUserProfile(userInfo?._id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      school: "",
      field: "",
      startYear: "",
      endYear: "",
    },
  });

  const onSubmit = async (values: EducationFormValues) => {
    if (!profile) return;
    setIsSubmitting(true);

    const newEducation = {
      degree: values.degree,
      school: values.school,
      field: values.field,
      startDate: new Date(`${values.startYear}-01-01`),
      endDate: new Date(`${values.endYear}-01-01`),
    };

    const updatedEducation = [...(profile.education || []), newEducation];

    try {
      await updateProfile({
        userId: userInfo?._id,
        education: updatedEducation,
      });
      toast.success("Education added successfully");
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to add education: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteEducation = async (index: number) => {
    if (!profile) return;

    const updatedEducation = (profile.education || []).filter((_, i) => i !== index);

    try {
      await updateProfile({
        userId: userInfo?._id,
        education: updatedEducation,
      });
      toast.success("Education deleted successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to delete education: ${errorMessage}`);
    }
  };

  const educationList = profile?.education || [];

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
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
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
                  name="startYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Start Year</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>End Year</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Education"}
              </Button>
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
            {educationList.length > 0 ? (
              educationList.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {edu.school}
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                      </div>
                      <div className="text-sm text-gray-600">Field: {edu.field}</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteEducation(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No education records added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
