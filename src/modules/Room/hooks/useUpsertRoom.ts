import { generateShortID } from '@/hooks';
import { SessionType, upsertSession } from '@/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type CreateRoomPayload = {
  name: string;
  id?: string;
  participants?: SessionType['participants'];
};

export const useUpsertRoom = (
  options?: UseMutationOptions<CreateRoomPayload, Error, CreateRoomPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    CreateRoomPayload,
    Error,
    CreateRoomPayload
  >({
    mutationFn: async ({ id, name, participants = {} }) => {
      const payload = {
        name,
        id: id ?? generateShortID(),
        participants,
        revealed: false,
      };
      console.log('🚀 ~ mutationFn: ~ payload:', payload);
      const result = await upsertSession(payload);
      if (result) return payload;
      throw new Error('Failed to create room');
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
