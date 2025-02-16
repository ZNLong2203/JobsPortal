"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Resume } from "@/types/resume";
import { useUsers } from "@/hooks/useUsers";
import { useCompanies } from "@/hooks/useCompanies";
import { useJobs } from "@/hooks/useJobs";

interface ResumeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormResumeData) => void;
  initialData?: Resume;
}

interface FormResumeData {
  user: string;
  company: string;
  job: string;
  status: string;
  file?: File;
  url?: string;
}

export function ResumeFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ResumeFormModalProps) {
  const [resume, setResume] = useState<FormResumeData>({
    user: "",
    company: "",
    job: "",
    status: "",
  });

  const { users } = useUsers();
  const usersList = Array.isArray(users) ? users : users?.users || [];
  const { companies } = useCompanies();
  const companiesList = Array.isArray(companies) ? companies : companies?.companies || [];
  const { jobs } = useJobs();
  const jobsList = Array.isArray(jobs) ? jobs : jobs?.jobs || [];

  useEffect(() => {
    if (initialData) {
      setResume({
        user: typeof initialData.user === "object" ? initialData.user._id || "" : initialData.user,
        company:
          typeof initialData.company === "object" ? initialData.company._id || "" : initialData.company,
        job: typeof initialData.job === "object" ? initialData.job._id || "" : initialData.job,
        status: initialData.status,
        url: initialData.url,
      });
    } else {
      setResume({
        user: "",
        company: "",
        job: "",
        status: "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(resume);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Resume" : "Add New Resume"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Field */}
            <div>
              <Label htmlFor="user">User</Label>
              <Select
                value={resume.user}
                onValueChange={(value) => setResume({ ...resume, user: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {usersList.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Company Field */}
            <div>
              <Label htmlFor="company">Company</Label>
              <Select
                value={resume.company}
                onValueChange={(value) => setResume({ ...resume, company: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companiesList.map((company) => (
                    <SelectItem key={company._id} value={company._id || ""}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Field */}
            <div>
              <Label htmlFor="job">Job</Label>
              <Select
                value={resume.job}
                onValueChange={(value) => setResume({ ...resume, job: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {jobsList.map((job) => (
                    <SelectItem key={job._id} value={job._id}>
                      {job.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* File Upload or Current Resume */}
            {initialData ? (
              <div>
                <Label>Current Resume</Label>
                {resume.url ? (
                  <a href={resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Current File
                  </a>
                ) : (
                  <span>No file available</span>
                )}
              </div>
            ) : (
              <div>
                <Label htmlFor="file">Upload Resume (PDF)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setResume({ ...resume, file: e.target.files ? e.target.files[0] : undefined })
                  }
                  required
                />
              </div>
            )}

            {/* Status Field */}
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={resume.status}
                onChange={(e) => setResume({ ...resume, status: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Add"} Resume</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
