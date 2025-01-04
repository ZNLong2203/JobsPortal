import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllJob, getJobById, createJob, updateJob, deleteJob } from '@/constants/callapi';
import { Job, NewJob } from '@/types/job';

export function useJobs() {
  const queryClient = useQueryClient();

  const allJobQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: getAllJob,
  })

  const createJobMutation = useMutation({
    mutationFn: (job: NewJob) => createJob(job),
    onSuccess: (newJob) => {
      queryClient.setQueryData(['jobs'], (oldData: Job[] | undefined) => [...(oldData || []), newJob])
    },
  })

  const updateJobMutation = useMutation({
    mutationFn: ({ id, job }: { id: string; job: NewJob }) => updateJob(id, job),
    onSuccess: (updatedJob) => {
      queryClient.setQueryData(['jobs'], (oldData: Job[] | undefined) =>
        oldData?.map(job => job.id === updatedJob.id ? updatedJob : job)
      )
    },
  })

  const deleteJobMutation = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: (deletedJobId) => {
      queryClient.setQueryData(['jobs'], (oldData: Job[] | undefined) =>
        oldData?.filter(job => job.id !== deletedJobId)
      )
    },
  })

  return {
    jobs: allJobQuery.data ?? [],
    isLoading: allJobQuery.isLoading,
    isError: allJobQuery.isError,
    error: allJobQuery.error,
    createJob: createJobMutation.mutate,
    updateJob: updateJobMutation.mutate,
    deleteJob: deleteJobMutation.mutate,
  }
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobById(id),
  })
}