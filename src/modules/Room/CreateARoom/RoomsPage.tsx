import { UserProfile, useUser } from '@/modules/User';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { CreateARoomSection, JoinARoomSection } from './Sections';

export const RoomsPage = () => {
  const { data: userData } = useUser();
  const router = useRouter();
  const isHaveUserName = !!userData;

  if (!isHaveUserName) {
    return (
      <Stack flexGrow={1} justifyContent={'center'} alignItems={'center'}>
        <UserProfile customDisplayText={'Please set your username first'} />
      </Stack>
    );
  }
  return (
    <Stack flexGrow={1} gap={0}>
      {/* Creat a Room  */}
      <Stack
        direction={'column'}
        minHeight={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        flexGrow={1}
        paddingBlock={4}
        paddingInline={8}
        gapY={6}
        lg={{ paddingBlock: 16, paddingInline: 32 }}
        md={{ paddingBlock: 8, paddingInline: 16 }}
        width={'full'}
      >
        <CreateARoomSection router={router} userData={userData} />
      </Stack>
      {/* Join a Room */}
      <Stack
        backgroundColor={'var(--contentCardBg)'}
        paddingBlock={4}
        paddingInline={8}
        gapY={6}
        lg={{ paddingBlock: 16, paddingInline: 32 }}
        md={{ paddingBlock: 8, paddingInline: 16 }}
        alignItems={'center'}
        justifyContent={'center'}
        flexGrow={1}
      >
        <JoinARoomSection router={router} userData={userData} />
      </Stack>
    </Stack>
  );
};
