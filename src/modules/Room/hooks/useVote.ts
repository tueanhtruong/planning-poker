import { participantVote } from '@/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type VotePayload = {
  roomId: string;
  userId: string;
  vote: string;
};

export const useVote = (
  options?: UseMutationOptions<void, Error, VotePayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    VotePayload
  >({
    mutationFn: async ({ roomId, userId, vote }) => {
      return participantVote({
        sessionId: roomId,
        participantId: userId,
        vote,
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
