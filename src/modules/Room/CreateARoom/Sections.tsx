import { PATHS, UserType } from '@/services';
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useCheckSessionExists, useJoinRoom, useUpsertRoom } from '../hooks';

type RoomSectionProps = {
  userData?: UserType;
  router: AppRouterInstance;
};

export const CreateARoomSection: FC<RoomSectionProps> = ({
  userData,
  router,
}) => {
  const { upsert: createRoom, isPending: creating } = useUpsertRoom();
  const { upsert: joinRoom, isPending: joining } = useJoinRoom();

  const [roomName, setRoomName] = useState('');
  const handleChange =
    (dispatch: Dispatch<SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(event.target.value);

  const handleCreateRoom = async () => {
    console.log('🚀 ~ userData:', userData);
    if (!userData) {
      return;
    }
    createRoom(
      { name: roomName },
      {
        onSuccess(data) {
          if (data.id) {
            joinRoom(
              {
                roomId: data.id,
                userId: userData.id,
              },
              {
                onSuccess() {
                  router.push(`/${PATHS.ROOMS}/${data.id}`);
                },
              },
            );
          }
        },
      },
    );
  };
  return (
    <Stack gap={4}>
      <Text
        fontSize={'3xl'}
        md={{
          fontSize: '4xl',
        }}
        lg={{
          fontSize: '5xl',
        }}
        fontWeight={'semibold'}
      >
        Create a room to start collaborating with your team.
      </Text>
      <Text fontSize={'md'}>
        Set-up in seconds. All we need is a display name.
      </Text>
      <Input
        value={roomName}
        onChange={handleChange(setRoomName)}
        placeholder="Enter Your Room Name"
        fontSize={'md'}
      />
      <Button
        width={'fit-content'}
        disabled={!roomName}
        loading={creating || joining}
        onClick={handleCreateRoom}
        alignSelf={'flex-end'}
      >
        Create Room
      </Button>
    </Stack>
  );
};

export const JoinARoomSection: FC<RoomSectionProps> = ({
  userData,
  router,
}) => {
  const { upsert: checkRoom, isPending: checking } = useCheckSessionExists();
  const { upsert: joinRoom, isPending: joining } = useJoinRoom();

  const [roomId, setRoomId] = useState('');
  const handleChange =
    (dispatch: Dispatch<SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(event.target.value);

  const handleJoinRoom = async () => {
    if (!userData) {
      return;
    }
    checkRoom(
      {
        roomId,
      },
      {
        onSuccess() {
          joinRoom(
            {
              roomId,
              userId: userData.id,
            },
            {
              onSuccess() {
                router.push(`/${PATHS.ROOMS}/${roomId}`);
              },
            },
          );
        },
        onError() {
          alert('Room not found');
        },
      },
    );
  };
  return (
    <Stack gap={4} color={'white'}>
      <Text
        fontSize={'3xl'}
        md={{
          fontSize: '4xl',
        }}
        lg={{
          fontSize: '5xl',
        }}
        fontWeight={'semibold'}
      >
        Join a room to start collaborating with your team.
      </Text>
      <Text fontSize={'md'}>
        Put your room ID here to join an existing room.
      </Text>
      <Input
        value={roomId}
        onChange={handleChange(setRoomId)}
        placeholder="Enter Your Room ID"
        fontSize={'md'}
        _placeholder={{
          color: 'white',
        }}
      />
      <Button
        width={'fit-content'}
        disabled={!roomId}
        loading={joining || checking}
        onClick={handleJoinRoom}
        alignSelf={'flex-end'}
      >
        Join Room
      </Button>
    </Stack>
  );
};
