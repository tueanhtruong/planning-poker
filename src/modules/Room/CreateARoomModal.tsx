import { UserType } from '@/services';
import {
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useUser } from '../User';
import { useJoinRoom, useUpsertRoom } from './hooks';

export const CreateARoomModal = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { data: userData } = useUser();
  const router = useRouter();
  const isHaveUserName = !!userData;

  if (!isHaveUserName) {
    return (
      <Text
        fontWeight={'bold'}
        fontSize={'md'}
        md={{
          fontSize: 'lg',
        }}
        lg={{
          fontSize: 'xl',
        }}
        marginBlockStart={2}
        color={'red'}
      >
        Please set your username first
      </Text>
    );
  }

  return (
    <>
      <Button
        width={'fit-content'}
        marginBlockStart={4}
        fontWeight={'semibold'}
        size={'xl'}
        onClick={() => {
          setOpenDialog(!openDialog);
        }}
      >
        START NOW
      </Button>
      <Dialog.Root
        size={'md'}
        open={openDialog}
        onOpenChange={({ open }) => setOpenDialog(open)}
        placement={'center'}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <Stack
                  flex={1}
                  paddingInline={1}
                  flexWrap={'wrap'}
                  marginBlock={4}
                >
                  <Tabs.Root defaultValue="create" variant="plain">
                    <Tabs.List bg="bg.muted" rounded="l3" p="1">
                      <Tabs.Trigger
                        value="create"
                        paddingBlock={0}
                        height={'auto'}
                        lineHeight={1.4}
                        fontSize={'md'}
                        fontWeight={'bold'}
                      >
                        Create your Instant Room
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="join"
                        paddingBlock={0}
                        height={'auto'}
                        lineHeight={1.4}
                        fontSize={'md'}
                        fontWeight={'bold'}
                      >
                        Join a Room
                      </Tabs.Trigger>
                      <Tabs.Indicator rounded="l2" />
                    </Tabs.List>
                    <Tabs.Content value="create">
                      <CreateARoomSection userData={userData} router={router} />
                    </Tabs.Content>
                    <Tabs.Content value="join">
                      <JoinARoomSection userData={userData} router={router} />
                    </Tabs.Content>
                  </Tabs.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

type RoomSectionProps = {
  userData?: UserType;
  router: AppRouterInstance;
};

const CreateARoomSection: FC<RoomSectionProps> = ({ userData, router }) => {
  const { upsert: createRoom, isPending: creating } = useUpsertRoom();
  const { upsert: joinRoom, isPending: joining } = useJoinRoom();
  // const router = useRouter();

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
                  router.push(`./room/${data.id}`);
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

const JoinARoomSection: FC<RoomSectionProps> = ({ userData, router }) => {
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
    joinRoom(
      {
        roomId,
        userId: userData.id,
      },
      {
        onSuccess() {
          router.push(`/room/${roomId}`);
        },
      },
    );
  };
  return (
    <Stack gap={4}>
      <Text fontSize={'md'}>
        Put your room ID here to join an existing room.
      </Text>
      <Input
        value={roomId}
        onChange={handleChange(setRoomId)}
        placeholder="Enter Your Room ID"
        fontSize={'md'}
      />
      <Button
        width={'fit-content'}
        disabled={!roomId}
        loading={joining}
        onClick={handleJoinRoom}
        alignSelf={'flex-end'}
      >
        Join Room
      </Button>
    </Stack>
  );
};
