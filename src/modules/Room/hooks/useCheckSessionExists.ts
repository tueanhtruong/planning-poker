import { checkSessionExists } from '@/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type CheckSessionExistsPayload = { roomId: string };

export const useCheckSessionExists = (
  options?: UseMutationOptions<boolean, Error, CheckSessionExistsPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    boolean,
    Error,
    CheckSessionExistsPayload
  >({
    mutationFn: async ({ roomId }) => {
      return checkSessionExists(roomId);
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
