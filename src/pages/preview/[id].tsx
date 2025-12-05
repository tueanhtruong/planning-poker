'use client';
import { Navbar, RoomPlayGround, useUser } from '@/modules';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Store = () => {
  const router = useRouter();
  const id = (router.query.id ?? '') as string;
  const { data: userData } = useUser();

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
        <RoomPlayGround id={id} userData={userData} preview />
      </Stack>
    </>
  );
};
export default Store;
