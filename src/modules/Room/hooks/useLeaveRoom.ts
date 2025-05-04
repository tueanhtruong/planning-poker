import { removeParticipant } from '@/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type LeaveRoomPayload = { roomId: string; userId: string };

export const useLeaveRoom = (
  options?: UseMutationOptions<void, Error, LeaveRoomPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    LeaveRoomPayload
  >({
    mutationFn: async ({ roomId, userId }) => {
      return removeParticipant(roomId, userId);
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
