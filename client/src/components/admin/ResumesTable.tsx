"use client";

import { useState } from "react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Sử dụng file worker từ thư mục public
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function getInlineUrl(url: string): string {
  if (url.includes("fl_attachment:false")) return url;
  if (url.includes("/raw/upload/")) {
    return url.replace("/raw/upload/", "/raw/upload/fl_attachment:false/");
  }
  return url.replace("/upload/", "/upload/fl_attachment:false/");
}

interface ResumesTableProps {
  resumes: Resume[];
  onEdit: (resume: Resume) => void;
  onDelete: (id: string) => void;
}

export function ResumesTable({ resumes, onEdit, onDelete }: ResumesTableProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPdfUrl(getInlineUrl(resume.url));
                    }}
                  >
                    <ExternalLinkIcon className="h-4 w-4 mr-1" />
                    View
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal hiển thị PDF */}
      {pdfUrl && (
        <Dialog open={true} onOpenChange={() => setPdfUrl(null)}>
          <DialogContent style={{ width: "80vw", height: "80vh", overflow: "auto" }}>
            <DialogHeader>
              <DialogTitle>PDF Preview</DialogTitle>
            </DialogHeader>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
            {numPages && numPages > 1 && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <Button onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))} disabled={pageNumber <= 1}>
                  Previous
                </Button>
                <span style={{ margin: "0 1rem" }}>
                  Page {pageNumber} of {numPages}
                </span>
                <Button onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))} disabled={pageNumber >= numPages}>
                  Next
                </Button>
              </div>
            )}
            <div style={{ textAlign: "right", marginTop: "1rem" }}>
              <Button onClick={() => setPdfUrl(null)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
