import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllSubscribers, createSubscriber, deleteSubscriber } from '@/redux/api/subscriberApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export function useSubscribers() {
  const queryClient = useQueryClient();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { 
    data: subscribers = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['subscribers'],
    queryFn: getAllSubscribers,
    enabled: !!userInfo, 
  });

  const createMutation = useMutation({
    mutationFn: createSubscriber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscriber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    }
  });

  return {
    subscribers,
    isLoading,
    error,
    createSubscriber: createMutation.mutateAsync,
    deleteSubscriber: deleteMutation.mutateAsync,
  };
}