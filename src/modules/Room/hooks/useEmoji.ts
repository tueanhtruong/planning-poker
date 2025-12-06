import { FlyingEmojiType, removeFlyingEmoji, sendEmoji } from '@/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type SendEmojiPayload = {
  roomId: string;
  payload: FlyingEmojiType;
};

type RemoveEmojiPayload = {
  roomId: string;
  emojiId: string;
};

export const useSendEmoji = (
  options?: UseMutationOptions<void, Error, SendEmojiPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    SendEmojiPayload
  >({
    mutationFn: async ({ roomId, payload }) => {
      return sendEmoji({
        sessionId: roomId,
        payload,
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
export const useRemoveEmoji = (
  options?: UseMutationOptions<void, Error, RemoveEmojiPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    RemoveEmojiPayload
  >({
    mutationFn: async ({ roomId, emojiId }) => {
      return removeFlyingEmoji({
        sessionId: roomId,
        flyingEmojiId: emojiId,
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
