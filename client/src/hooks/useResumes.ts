import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllResume, getResumeById, createResume, updateResume, deleteResume } from '@/constants/callapi';
import { Resume, NewResume } from '@/types/resume';

export const useResumes = (page: number = 1, limit: number = 10) => {
  const queryClient = useQueryClient();

  const allResumeQuery = useQuery({
    queryKey: ['resumes', page, limit],
    queryFn: () => getAllResume(page, limit),
  })

  const createResumeMutation = useMutation({
    mutationFn: (resume: NewResume) => createResume(resume),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    }
  })

  const updateResumeMutation = useMutation({
    mutationFn: ({ resume }: { resume: Resume }) => updateResume(resume),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    }
  })

  const deleteResumeMutation = useMutation({
    mutationFn: (_id: string) => deleteResume(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    }
  })

  return {
    resumes: allResumeQuery.data ?? [],
    isLoading: allResumeQuery.isLoading,
    isError: allResumeQuery.isError,
    error: allResumeQuery.error,
    createResume: createResumeMutation.mutate,
    updateResume: updateResumeMutation.mutate,
    deleteResume: deleteResumeMutation.mutate,
  } 
}

export const useResume = (_id: string) => {
  return useQuery({
    queryKey: ['resume', _id],
    queryFn: () => getResumeById(_id),
  })
}