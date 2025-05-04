import { generateUUID } from '@/hooks';
import { getUserData, UserType, writeUserData } from '@/services';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

const UserIdKey = 'userId' as const;

export const getLocalStorageInfo = (key: string) => {
  if (typeof window !== 'undefined') {
    const val = localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
    return null;
  }
  return null;
};

export const writeLocalStorageInfo = (key: string, value: unknown) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export function useUser(
  options?: Partial<UseQueryOptions<unknown, Error, UserType>> & {
    id?: string;
  },
) {
  const { id, ...rest } = options || {};
  const { data, error, refetch, isFetching } = useQuery<
    unknown,
    Error,
    UserType
  >({
    queryKey: ['users', id ?? 'me'],
    queryFn: () => {
      if (id) {
        return getUserData(id);
      }
      const userId = getLocalStorageInfo(UserIdKey);
      if (!userId) {
        return new Promise((resolve) => resolve(null));
      }
      return getUserData(userId);
    },
    ...rest,
  });

  return {
    data,
    isFetching,
    error,
    refetch,
  };
}

type UpsertUserPayload = Pick<UserType, 'displayName'> & {
  id?: string;
};

export const useUpsertUser = (
  options?: UseMutationOptions<void, Error, UpsertUserPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    UpsertUserPayload
  >({
    mutationFn: ({ id, displayName }) => {
      const payload = {
        displayName,
        id: id ?? generateUUID(),
      };
      if (!id) {
        writeLocalStorageInfo(UserIdKey, payload.id);
      }
      return writeUserData(payload);
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
