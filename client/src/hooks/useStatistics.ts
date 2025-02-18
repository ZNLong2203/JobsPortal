import { getAdminStatistics, getCompanyStatistics, getHRStatistics, getUserStatistics } from "@/redux/api/statisticApi";
import { useQuery } from "@tanstack/react-query";

export function useAdminStatistics() {
  return useQuery({
    queryKey: ['adminStatistics'],
    queryFn: () => getAdminStatistics(),
  });
}

export function useCompanyStatistics() {
  return useQuery({
    queryKey: ['companyStatistics'],
    queryFn: () => getCompanyStatistics(),
  });
}

export function useHRStatistics() {
  return useQuery({
    queryKey: ['hrStatistics'],
    queryFn: () => getHRStatistics(),
  });
}

export function useUserStatistics() {
  return useQuery({
    queryKey: ['userStatistics'],
    queryFn: () => getUserStatistics(),
  });
}