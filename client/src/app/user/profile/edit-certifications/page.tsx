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
import { Award, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUserProfile } from "@/hooks/useUserProfile";

const certificationSchema = z.object({
  name: z.string().min(2, { message: "Certification must be at least 2 characters." }),
});

type Certification = z.infer<typeof certificationSchema>;

export default function EditCertificationsPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { profile, updateProfile } = useUserProfile(userInfo?._id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Certification>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: Certification) => {
    if (!profile) return;
    setIsSubmitting(true);

    const currentCertifications = profile.certifications || [];
    const newCertificates = [...currentCertifications, values.name];

    try {
      await updateProfile({
        userId: userInfo?._id,
        certifications: newCertificates,
      });
      toast.success("Certification added successfully");
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to add certification: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCertification = async (index: number) => {
    if (!profile) return;

    const currentCertifications = profile.certifications || [];
    const updatedCertificates = currentCertifications.filter((_, i) => i !== index);

    try {
      await updateProfile({
        userId: userInfo?._id,
        certifications: updatedCertificates,
      });
      toast.success("Certification deleted successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to delete certification: ${errorMessage}`);
    }
  };

  const certificationsList = profile?.certifications || [];

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
                    <FormLabel>Certification</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Certification"}
              </Button>
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
            {certificationsList.length > 0 ? (
              certificationsList.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{cert}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteCertification(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p>No certifications added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
