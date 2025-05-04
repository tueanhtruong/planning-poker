import { revealCards } from '@/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type RevealPayload = {
  roomId: string;
  revealed: boolean;
};

export const useReveal = (
  options?: UseMutationOptions<void, Error, RevealPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    RevealPayload
  >({
    mutationFn: async ({ roomId, revealed }) => {
      return revealCards({
        sessionId: roomId,
        revealed,
      });
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
