import { CommonContainer } from '@/components';
import { UserProfile, useUser } from '@/modules/User';
import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
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
      {/* Create a Room */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexGrow: 1 }}
      >
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
      </motion.div>

      {/* Join a Room */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        style={{ display: 'flex', flexGrow: 1 }}
      >
        <Stack
          className="section-surface"
          gapY={6}
          alignItems={'center'}
          justifyContent={'center'}
          flexGrow={1}
          borderTop={'1px solid var(--color-border)'}
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
      </motion.div>
    </Stack>
  );
};
