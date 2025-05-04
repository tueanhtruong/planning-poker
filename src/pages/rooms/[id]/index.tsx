'use client';
import {
  BeforeUnloadAction,
  Config,
  Navbar,
  RoomPlayGround,
  useUser,
} from '@/modules';
import { useLeaveRoom } from '@/modules/Room/hooks';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Store = () => {
  const router = useRouter();
  const id = (router.query.id ?? '') as string;
  const { data: userData } = useUser();
  const { upsert: leaveRoom } = useLeaveRoom();

  return (
    <>
      <Navbar />
      <Stack
        direction={'column'}
        minHeight={'100%'}
        width={'100%'}
        gap={12}
        marginBlockStart={6}
        marginBlockEnd={8}
        alignItems={'center'}
      >
        <RoomPlayGround id={id} userData={userData} />
        <BeforeUnloadAction
          onBeforeUnload={() => {
            leaveRoom({ roomId: id, userId: userData?.id ?? '' });
          }}
        />
      </Stack>
      <Config />
    </>
  );
};
export default Store;
