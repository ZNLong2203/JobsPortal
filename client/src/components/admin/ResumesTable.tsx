"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, ExternalLinkIcon } from "lucide-react";
import { Resume } from "@/types/resume";

interface ResumesTableProps {
  resumes: Resume[];
  onEdit: (resume: Resume) => void;
  onDelete: (id: string) => void;
}

export function ResumesTable({ resumes, onEdit, onDelete }: ResumesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resumes.map((resume) => (
          <TableRow key={resume._id}>
            <TableCell>{typeof resume.user === "object" ? resume.user.name : "N/A"}</TableCell>
            <TableCell>{typeof resume.company === "object" ? resume.company.name : "N/A"}</TableCell>
            <TableCell>{typeof resume.job === "object" ? resume.job.name : "N/A"}</TableCell>
            <TableCell>{resume.status}</TableCell>
            <TableCell>
              {resume?.createdAt ? new Date(resume.createdAt).toLocaleDateString() : "N/A"}
            </TableCell>
            <TableCell className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(resume)}>
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(resume._id!)}>
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete
              </Button>
              {resume.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={resume.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="h-4 w-4 mr-1" />
                    View
                  </a>
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
