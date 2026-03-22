import {
  deleteSession,
  getLatestSessions,
  SessionType,
  watchSession,
} from '@/services';
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

export const useGetLastedRooms = () => {
  const { data, error, isFetching } = useQuery<SessionType[], Error>({
    queryKey: ['latest-rooms'],
    queryFn: async () => {
      const sessions = await getLatestSessions();
      return sessions;
    },
  });
  const lastestRooms = data?.slice(0, 3) ?? [];
  // Get the rest of rooms except the latest 3 rooms, and filter out the empty rooms
  const restUnusedRooms = (data?.slice(3) ?? []).filter((room) => {
    const isRoomEmpty =
      !room.participants || Object.keys(room.participants).length === 0;
    return isRoomEmpty;
  });
  // Delete the empty rooms in background
  useEffect(() => {
    if (!restUnusedRooms.length) return;
    restUnusedRooms.forEach((room) => {
      // Call the API to delete the room
      deleteSession(room.id);
    });
  }, [restUnusedRooms]);

  return {
    data: lastestRooms,
    isFetching,
    error,
  };
};
