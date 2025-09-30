import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { SportApiResponseDto } from "@/dto/sport-api.response.dto";

interface FetchApiProps{
  url: string;
}

/**
 * Generic React Query hook to fetch any API endpoint and map response dynamically
 * @param url API endpoint relative to /service-api/
 * @param options Optional React Query overrides
 */
export const useFetchApi = <T>({ url }: FetchApiProps) => {
  return useQuery<T, Error>({
    queryKey: [url], // cache based on URL
    queryFn: async () => {
      const res = await fetch(`/service-api/${url}`, { cache: 'no-store' });

      if (!res.ok) {
        throw new Error(`Network error: ${res.status} ${res.statusText}`);
      }

      const data: SportApiResponseDto<T> = await res.json();

      if (!data.Success || !data.Value) {
        throw new Error(data.Error || "Failed to fetch data");
      }

      return data.Value;
    },
    staleTime: 1000 * 5,        // consider data fresh for 5s
    refetchInterval: 1000 * 5,  // automatically refetch every 5s
    retry: 2,                    // retry twice on failure
    refetchOnWindowFocus: false, // avoid unnecessary refetch
    networkMode: 'online',
  });
};
