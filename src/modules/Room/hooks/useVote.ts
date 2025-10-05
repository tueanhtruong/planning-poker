import { participantVote, participantVoteV2 } from '@/services';
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

type VotePayloadV2 = {
  roomId: string;
  userId: string;
  votes: string[];
};

export const useVoteV2 = (
  options?: UseMutationOptions<void, Error, VotePayloadV2>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    VotePayloadV2
  >({
    mutationFn: async ({ roomId, userId, votes }) => {
      return participantVoteV2({
        sessionId: roomId,
        participantId: userId,
        votes,
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
