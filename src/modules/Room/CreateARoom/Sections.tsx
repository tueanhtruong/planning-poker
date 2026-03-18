import { PATHS, UserType } from '@/services';
import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  useCheckSessionExists,
  useGetLastedRooms,
  useJoinRoom,
  useUpsertRoom,
} from '../hooks';

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
    <Stack gap={5}>
      <Text
        fontSize={'3xl'}
        md={{ fontSize: '4xl' }}
        lg={{ fontSize: '5xl' }}
        fontWeight={'bold'}
        color={'var(--color-text-primary)'}
        lineHeight={'1.2'}
        style={{ letterSpacing: '-0.02em' }}
      >
        Create a <span className="gradient-text">room</span> to start
        collaborating.
      </Text>
      <Text fontSize={'md'} color={'var(--color-text-secondary)'}>
        Set-up in seconds. All we need is a room name.
      </Text>
      <Input
        value={roomName}
        onChange={handleChange(setRoomName)}
        placeholder="Enter Your Room Name"
        fontSize={'md'}
      />
      <Button
        className="cta-primary"
        width={'fit-content'}
        disabled={!roomName}
        loading={creating || joining}
        onClick={handleCreateRoom}
        alignSelf={'flex-end'}
        size={'md'}
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
  const { data: latestRooms } = useGetLastedRooms();

  const [roomId, setRoomId] = useState('');
  const handleChange =
    (dispatch: Dispatch<SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(event.target.value);

  const handleJoinRoom = async (selectedRoomId?: string, preview?: boolean) => {
    if (!userData) {
      return;
    }
    const joiningRoomId = selectedRoomId ?? roomId;
    checkRoom(
      {
        roomId: joiningRoomId,
      },
      {
        onSuccess() {
          joinRoom(
            {
              roomId: joiningRoomId,
              userId: userData.id,
            },
            {
              onSuccess() {
                router.push(
                  `/${preview ? PATHS.PREVIEW : PATHS.ROOMS}/${joiningRoomId}`,
                );
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
    <Stack gap={5} color={'var(--color-text-primary)'}>
      <Stack gap={4}>
        <Text
          fontSize={'3xl'}
          md={{ fontSize: '4xl' }}
          lg={{ fontSize: '5xl' }}
          fontWeight={'bold'}
          color={'var(--color-text-primary)'}
          lineHeight={'1.2'}
          style={{ letterSpacing: '-0.02em' }}
        >
          Join a <span className="gradient-text">room</span> to collaborate.
        </Text>
        <Text fontSize={'md'} color={'var(--color-text-secondary)'}>
          Put your room ID here to join an existing room.
        </Text>
        <Stack gap={4} direction={'row'}>
          <Input
            value={roomId}
            onChange={handleChange(setRoomId)}
            placeholder="Enter Your Room ID"
            fontSize={'md'}
          />
          <Button
            className="cta-primary"
            width={'fit-content'}
            disabled={!roomId}
            loading={joining || checking}
            onClick={() => handleJoinRoom(roomId)}
            alignSelf={'flex-end'}
          >
            Join Room
          </Button>
        </Stack>
      </Stack>
      {latestRooms && latestRooms.length > 0 && (
        <Stack gap={3}>
          <Text
            fontSize={'sm'}
            fontStyle={'italic'}
            color={'var(--color-text-muted)'}
          >
            or join one of the latest rooms:
          </Text>
          <Stack gap={2} direction={'column'}>
            {latestRooms.map((room) => (
              <Flex direction={'row'} gap={2} key={room.id}>
                <Button
                  variant={'outline'}
                  data-variant="outline"
                  width={'fit-content'}
                  height={'32px'}
                  style={{
                    borderColor: 'var(--color-border-hover)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.875rem',
                  }}
                  onClick={() => {
                    handleJoinRoom(room.id);
                  }}
                >
                  {room.name}
                </Button>
                <Button
                  variant={'ghost'}
                  width={'fit-content'}
                  height={'32px'}
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.875rem',
                  }}
                  onClick={() => {
                    handleJoinRoom(room.id, true);
                  }}
                >
                  Preview
                </Button>
              </Flex>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
