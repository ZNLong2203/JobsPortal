import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllResume, getResumeById, createResume, updateResume, deleteResume } from '@/redux/api/resumeApi';
import { Resume, NewResume } from '@/types/resume';
import { uploadResume } from '@/redux/api/fileApi';

export const useResumes = (page: number = 1, limit: number = 10) => {
  const queryClient = useQueryClient();

  const allResumeQuery = useQuery({
    queryKey: ['resumes', page, limit],
    queryFn: () => getAllResume(page, limit),
  });

  const uploadResumeMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return uploadResume(formData);
    }
  });

  const createResumeMutation = useMutation({
    mutationFn: async ({
      resumeData,
      file,
    }: {
      resumeData: NewResume;
      file: File;
    }) => {
      // Upload file to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      const uploadResult = await uploadResume(formData);

      // Create resume with the uploaded file URL
      const resume = {
        ...resumeData,
        url: uploadResult.url, 
      };

      return createResume(resume);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });

  const updateResumeMutation = useMutation({
    mutationFn: ({ resume }: { resume: Resume }) => updateResume(resume),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    }
  });

  const deleteResumeMutation = useMutation({
    mutationFn: (_id: string) => deleteResume(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    }
  });

  return {
    resumes: allResumeQuery.data ?? [],
    isLoading: allResumeQuery.isLoading,
    isError: allResumeQuery.isError,
    error: allResumeQuery.error,
    createResume: createResumeMutation.mutate,
    updateResume: updateResumeMutation.mutate,
    deleteResume: deleteResumeMutation.mutate,
    isUploading: uploadResumeMutation.isPending || createResumeMutation.isPending
  };
};

export const useResume = (_id: string) => {
  return useQuery({
    queryKey: ['resume', _id],
    queryFn: () => getResumeById(_id),
  });
};
