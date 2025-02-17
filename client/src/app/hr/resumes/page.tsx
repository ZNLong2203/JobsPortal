'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useResumes } from '@/hooks/useResumes'
import { LoadingSpinner } from '@/components/common/IsLoading'
import { ErrorMessage } from '@/components/common/IsError'
import toast from 'react-hot-toast'
import moment from 'moment'
import { Pagination } from '@/components/common/Pagination'
import { User } from '@/types/user'
import { Job } from '@/types/job'
import { Resume } from '@/types/resume'

export default function ResumeManagement() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    resumes: resumesData,
    isLoading,
    isError,
    error,
    updateResumeStatus,
  } = useResumes(page, limit, userInfo?.company as string);

  const resumeList = Array.isArray(resumesData) ? resumesData : resumesData?.resumes ?? [];
  const metadata = Array.isArray(resumesData) ? null : resumesData?.metadata ?? null;

  const handleApprove = (resume: Resume) => {
    if (window.confirm('Are you sure you want to approve this resume?')) {
      updateResumeStatus(
        { 
          id: resume._id as string, 
          status: 'approved',
          email: resume.email
        },
        {
          onSuccess: () => {
            toast.success('Resume approved successfully');
          },
          onError: (error: Error) => {
            toast.error(`Failed to approve resume: ${error.message}`);
          }
        }
      );
    }
  };

  const handleReject = (resume: Resume) => {
    if (window.confirm('Are you sure you want to reject this resume?')) {
      updateResumeStatus(
        { 
          id: resume._id as string, 
          status: 'rejected',
          email: resume.email
        },
        {
          onSuccess: () => {
            toast.success('Resume rejected successfully');
          },
          onError: (error: Error) => {
            toast.error(`Failed to reject resume: ${error.message}`);
          }
        }
      );
    }
  };

  const filteredResumes = resumeList.filter(resume => 
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof resume.job !== 'string' && resume.job.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message || "An error occurred"} />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Management</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search resumes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResumes.map((resume) => (
                <TableRow key={resume._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage 
                          src={(resume.user as User).avatar} 
                          alt={resume.name} 
                        />
                        <AvatarFallback>{resume.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {resume.name}
                    </div>
                  </TableCell>
                  <TableCell>{(resume.job as Job).name}</TableCell>
                  <TableCell>{moment(resume.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Badge variant={
                      resume.status === 'pending' ? 'default' :
                      resume.status === 'approved' ? 'secondary' :
                      'destructive'
                    }>
                      {resume.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(resume.url, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600"
                        onClick={() => handleApprove(resume)}
                        disabled={resume.status !== 'pending'}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleReject(resume)}
                        disabled={resume.status !== 'pending'}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {metadata && (
            <div className="mt-4">
              <Pagination
                currentPage={page}
                totalPages={metadata.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

