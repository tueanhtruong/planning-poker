import { CommonContainer } from '@/components';
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
      <CommonContainer>
        <Stack
          direction={'column'}
          minHeight={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          flexGrow={1}
          gapY={6}
          width={'full'}
          maxW={'100%'}
          md={{ maxW: '80%' }}
        >
          <CreateARoomSection router={router} userData={userData} />
        </Stack>
      </CommonContainer>
      {/* Join a Room */}
      <Stack
        backgroundColor={'var(--contentCardBg)'}
        gapY={6}
        alignItems={'center'}
        justifyContent={'center'}
        flexGrow={1}
      >
        <CommonContainer>
          <Stack
            width={'full'}
            maxW={'100%'}
            md={{ maxW: '80%' }}
            marginInlineStart={'auto'}
          >
            <JoinARoomSection router={router} userData={userData} />
          </Stack>
        </CommonContainer>
      </Stack>
    </Stack>
  );
};
