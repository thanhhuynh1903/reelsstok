// import { useQuery } from '@tanstack/react-query';
// import { AxiosError } from 'axios';
// import apiClient from '@/API/axios';
// interface ApiQueryOptions<T> {
//   queryKey: string[];
//   endpoint: string;
//   enabled?: boolean;
// }

// export function useApiQuery<T>({ queryKey, endpoint, enabled = true }: ApiQueryOptions<T>) {

//   return useQuery<T, AxiosError>({
//     queryKey,
//     queryFn: async () => {
//       const response = await apiClient.get(endpoint);
//       return response.data;
//     },
//     enabled: enabled , // Only fetch if authenticated
//     retry: 1,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// }