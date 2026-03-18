import { PATHS } from '@/services';
import {
  heroCTAVariants,
  heroHeadlineVariants,
  heroSubtextVariants,
} from '@/styles/animations';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HERO_LINES = [
  'Estimate together.',
  'Ship with confidence.',
  'Align your sprint goals.',
  'Keep planning frictionless.',
];

export const Section1 = () => {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLineIndex((prevIndex) => (prevIndex + 1) % HERO_LINES.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <Stack
      className="hero-banner section-dark-hero"
      minHeight={{ base: 'calc(100vh - var(--navHeight))', md: '88vh' }}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
      overflow={'hidden'}
    >
      <div className="hero-grid-bg" aria-hidden="true" />
      <Stack
        className="hero-inner"
        paddingBlock={8}
        paddingInline={6}
        gapY={6}
        md={{ paddingBlock: 10, paddingInline: 12 }}
        lg={{ paddingBlock: 14, paddingInline: 20 }}
        width={'full'}
      >
        <Stack gap={{ base: 4, md: 5, lg: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Text className="hero-badge">
              <span className="hero-badge-dot" />
              Now in Beta
            </Text>
          </motion.div>

          <motion.div
            variants={heroHeadlineVariants}
            initial="initial"
            animate="animate"
          >
            <Text
              className="hero-title"
              fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }}
              fontWeight={'bold'}
              maxWidth={{ base: '100%', md: '80%' }}
              lineHeight={'0.95'}
              color={'var(--color-text-primary)'}
              style={{ letterSpacing: '-0.02em' }}
            >
              Planning Poker,
              <br />
              <span className="gradient-text">reimagined for modern teams</span>
            </Text>
          </motion.div>

          <motion.div
            variants={heroSubtextVariants}
            initial="initial"
            animate="animate"
          >
            <Text
              maxWidth={{ base: '100%', md: '74%' }}
              marginBlockStart={1}
              fontSize={'md'}
              md={{ fontSize: 'lg' }}
              lg={{ fontSize: 'xl' }}
              fontWeight={'light'}
              color={'var(--color-text-secondary)'}
              lineHeight={'1.7'}
            >
              Build consensus faster with a smooth, real-time planning room for
              Scrum and Agile teams. Keep estimation sessions focused,
              transparent, and genuinely enjoyable.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45 }}
          >
            <Text className="hero-typewriter" key={lineIndex}>
              {HERO_LINES[lineIndex]}
            </Text>
          </motion.div>

          <motion.div
            variants={heroCTAVariants}
            initial="initial"
            animate="animate"
          >
            <Flex
              gap={8}
              alignItems={'center'}
              marginBlockStart={4}
              wrap={'wrap'}
            >
              <Link href={PATHS.ROOMS}>
                <Button
                  className="cta-primary"
                  width={'fit-content'}
                  fontWeight={'bold'}
                  size={'lg'}
                >
                  Create a Room
                </Button>
              </Link>
              <a href="#how-to-play" className="hero-secondary-link">
                See How It Works
              </a>
              <Image
                src={'/static/logo.webp'}
                alt={'Logo'}
                width={44}
                height={44}
              />
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
          >
            <Flex className="hero-card-preview" aria-hidden="true">
              {['1', '3', '5', '8', '13'].map((value, index) => (
                <div
                  key={value}
                  className="hero-preview-card"
                  style={{
                    transform: `rotate(${(index - 2) * 6}deg) translateY(${Math.abs(index - 2) * -12}px)`,
                  }}
                >
                  {value}
                </div>
              ))}
            </Flex>
          </motion.div>
        </Stack>
      </Stack>
    </Stack>
  );
};
