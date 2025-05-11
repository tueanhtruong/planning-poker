import { SessionType, watchSession } from '@/services';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type WatchRoomResponse = {
  unsubscribe: () => void;
};

export const useRoomInfo = (
  options?: Partial<UseQueryOptions<unknown, Error, WatchRoomResponse>> & {
    id: string;
  },
) => {
  const { id, ...rest } = options || {};
  const [roomData, setRoomData] = useState<SessionType | null>(null);

  const { data, error, refetch, isFetching } = useQuery<
    unknown,
    Error,
    WatchRoomResponse
  >({
    queryKey: ['room', id],
    queryFn: () => {
      if (!id) {
        return null;
      }
      const unsubscribe = watchSession(id, (data: SessionType) => {
        setRoomData(data);
      });
      return {
        unsubscribe,
      };
    },
    enabled: false,

    ...rest,
  });

  useEffect(() => {
    refetch();
    return () => {
      console.log('Unsubscribing from room data');
      data?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!data) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    data: roomData,
    isFetching,
    error,
    refetch,
  };
};
