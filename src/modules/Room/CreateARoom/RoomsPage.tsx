import { UserProfile, useUser } from '@/modules/User';
import { Stack } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CreateARoomSection, JoinARoomSection } from './Sections';

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 28, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
};

export const RoomsPage = () => {
  const { data: userData } = useUser();
  const router = useRouter();

  if (!userData) {
    return (
      <Stack flexGrow={1} justifyContent={'center'} alignItems={'center'}>
        <UserProfile customDisplayText={'Please set your username first'} />
      </Stack>
    );
  }

  return (
    <div className="rooms-page-root">
      {/* Ambient blobs */}
      <div className="rooms-bg-blob rooms-bg-blob--indigo" />
      <div className="rooms-bg-blob rooms-bg-blob--cyan" />

      <motion.div
        className="rooms-cards-grid"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Create a Room card */}
        <motion.div
          variants={cardVariants}
          className="rooms-section-card rooms-section-card--create"
        >
          <div className="rooms-card-accent-bar rooms-card-accent-bar--indigo" />
          <div className="rooms-card-icon">✦</div>
          <CreateARoomSection router={router} userData={userData} />
        </motion.div>

        {/* Divider */}
        <div className="rooms-divider">
          <span className="rooms-divider-or">or</span>
        </div>

        {/* Join a Room card */}
        <motion.div
          variants={cardVariants}
          className="rooms-section-card rooms-section-card--join"
        >
          <div className="rooms-card-accent-bar rooms-card-accent-bar--cyan" />
          <div className="rooms-card-icon">⬡</div>
          <JoinARoomSection router={router} userData={userData} />
        </motion.div>
      </motion.div>
    </div>
  );
};
