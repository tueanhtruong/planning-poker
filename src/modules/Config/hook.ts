import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { ApplicationConfig, getConfig, upsertConfig } from '@/services';

export const useConfig = (
  options?: Partial<UseQueryOptions<unknown, Error, ApplicationConfig>>,
) => {
  const { data, error, refetch, isFetching } = useQuery<
    unknown,
    Error,
    ApplicationConfig
  >({
    queryKey: ['config'],
    queryFn: () => {
      return getConfig();
    },
    ...options,
  });
  return {
    data,
    isFetching,
    error,
    refetch,
  };
};

export const useUpsertConfig = (
  options?: UseMutationOptions<void, Error, ApplicationConfig>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    ApplicationConfig
  >({
    mutationFn: (payload) => {
      return upsertConfig(payload);
    },
    ...options,
  });
  return {
    data,
    upsert: mutate,
    isPending,
    error,
    reset,
  };
};
