import { upsertParticipant } from '@/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type JoinRoomPayload = { roomId: string; userId: string; preview?: boolean };

export const useJoinRoom = (
  options?: UseMutationOptions<void, Error, JoinRoomPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    JoinRoomPayload
  >({
    mutationFn: async ({ roomId, userId, preview }) => {
      return upsertParticipant(roomId, {
        id: userId,
        vote: '',
        votes: [],
        preview: preview ?? false,
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
