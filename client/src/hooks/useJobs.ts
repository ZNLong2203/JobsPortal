import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllJob, getJobById, createJob, updateJob, deleteJob } from '@/redux/api/jobApi';
import { Job, NewJob } from '@/types/job';

export function useJobs(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient();

  const allJobQuery = useQuery({
    queryKey: ['jobs', page, limit],
    queryFn: () => getAllJob(page, limit),
  })

  const createJobMutation = useMutation({
    mutationFn: (job: NewJob) => createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
  })

  const updateJobMutation = useMutation({
    mutationFn: ({ job }: { job: Job }) => updateJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
  })

  const deleteJobMutation = useMutation({
    mutationFn: (_id: string) => deleteJob(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
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

export function useJob(_id: string) {
  return useQuery({
    queryKey: ['job', _id],
    queryFn: () => getJobById(_id),
  })
}