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
    <Stack gap={6}>
      <Stack gap={2}>
        <Text
          fontSize={'xs'}
          fontWeight={'semibold'}
          style={{
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-indigo-hover)',
          }}
        >
          New session
        </Text>
        <Text
          fontSize={'2xl'}
          md={{ fontSize: '3xl' }}
          lg={{ fontSize: '4xl' }}
          fontWeight={'bold'}
          color={'var(--color-text-primary)'}
          lineHeight={'1.15'}
          style={{ letterSpacing: '-0.02em' }}
        >
          Create a <span className="gradient-text">room</span>
        </Text>
        <Text
          fontSize={'sm'}
          color={'var(--color-text-secondary)'}
          lineHeight={'1.6'}
        >
          Start a private session in seconds — no registration needed.
        </Text>
      </Stack>

      <Stack gap={3}>
        <Text
          fontSize={'xs'}
          fontWeight={'medium'}
          color={'var(--color-text-muted)'}
          style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Room name
        </Text>
        <Input
          value={roomName}
          onChange={handleChange(setRoomName)}
          placeholder="e.g. Sprint 42 Planning"
          fontSize={'md'}
        />
      </Stack>

      <Button
        className="cta-primary"
        width={'full'}
        disabled={!roomName}
        loading={creating || joining}
        onClick={handleCreateRoom}
        size={'md'}
      >
        Create Room →
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
                  `/${PATHS.ROOMS}/${joiningRoomId}${preview ? '?preview=true' : ''}`,
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
    <Stack gap={6}>
      <Stack gap={2}>
        <Text
          fontSize={'xs'}
          fontWeight={'semibold'}
          style={{
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-cyan)',
          }}
        >
          Have a code?
        </Text>
        <Text
          fontSize={'2xl'}
          md={{ fontSize: '3xl' }}
          lg={{ fontSize: '4xl' }}
          fontWeight={'bold'}
          color={'var(--color-text-primary)'}
          lineHeight={'1.15'}
          style={{ letterSpacing: '-0.02em' }}
        >
          Join a{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, var(--color-cyan), var(--color-cyan-hover))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            room
          </span>
        </Text>
        <Text
          fontSize={'sm'}
          color={'var(--color-text-secondary)'}
          lineHeight={'1.6'}
        >
          Paste the room ID or pick from your recent sessions below.
        </Text>
      </Stack>

      <Stack gap={3}>
        <Text
          fontSize={'xs'}
          fontWeight={'medium'}
          color={'var(--color-text-muted)'}
          style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Room ID
        </Text>
        <Stack gap={3} direction={'row'}>
          <Input
            value={roomId}
            onChange={handleChange(setRoomId)}
            placeholder="e.g. abc-123-xyz"
            fontSize={'md'}
            flex={1}
          />
          <Button
            className="cta-join"
            disabled={!roomId}
            loading={joining || checking}
            onClick={() => handleJoinRoom(roomId)}
            flexShrink={0}
          >
            Join →
          </Button>
        </Stack>
      </Stack>

      {latestRooms && latestRooms.length > 0 && (
        <Stack gap={3}>
          <Text
            fontSize={'xs'}
            color={'var(--color-text-muted)'}
            style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Recent rooms
          </Text>
          <Stack gap={2} direction={'column'}>
            {latestRooms.map((room) => (
              <Flex
                direction={'row'}
                gap={2}
                key={room.id}
                alignItems={'center'}
                style={{
                  padding: '8px 12px',
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'border-color 0.2s ease',
                }}
                className="recent-room-row"
              >
                <Text
                  fontSize={'sm'}
                  fontWeight={'medium'}
                  color={'var(--color-text-primary)'}
                  flex={1}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                  whiteSpace={'nowrap'}
                >
                  {room.name}
                </Text>
                <Button
                  size={'xs'}
                  variant={'outline'}
                  style={{
                    borderColor: 'var(--color-border-hover)',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    height: '26px',
                  }}
                  onClick={() => handleJoinRoom(room.id)}
                >
                  Join
                </Button>
                <Button
                  size={'xs'}
                  variant={'ghost'}
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    height: '26px',
                  }}
                  onClick={() => handleJoinRoom(room.id, true)}
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
