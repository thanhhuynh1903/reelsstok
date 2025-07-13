import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axios from 'axios';
import apiClient from '@/API/axios';
interface ApiQueryOptions{
  queryKey: string[];
  endpoint: string;
  enabled?: boolean;
}

export function useApiQuery({ queryKey, endpoint, enabled = true }: ApiQueryOptions) {
  return useQuery<AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get(endpoint);
      return response.data;
    },
    enabled: enabled , // Only fetch if authenticated
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function UseQueryNoToken({ queryKey, endpoint, enabled = true }: ApiQueryOptions) {
  return useQuery<AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(endpoint);      
      return response.data;
    },
    enabled: enabled , // Only fetch if authenticated
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
//staleTime: Thời gian dữ liệu được coi là "mới"
//refetchOnWindowFocus : true Tắt tự động gọi lại khi focus
//cacheTime: Thời gian giữ cache kể cả khi component unmount
//select : Chọn dữ liệu cần thiết (giảm load)
//
