import { PATHS } from '@/services';
import { staggerChild, staggerContainer } from '@/styles/animations';
import { Button, Stack, Text } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MouseEvent, type ReactNode } from 'react';
import { LuGift, LuSmartphone, LuUsers, LuZap } from 'react-icons/lu';

const FEATURES: {
  icon: ReactNode;
  color: string;
  glow: string;
  title: string;
  text: string;
}[] = [
  {
    icon: <LuUsers />,
    color: 'var(--color-indigo-hover)',
    glow: 'rgba(99,102,241,0.22)',
    title: 'Real-time Multiplayer',
    text: 'Plan and vote with your entire remote team instantly. No lag, no delay — just seamless collaboration.',
  },
  {
    icon: <LuZap />,
    color: 'var(--color-cyan)',
    glow: 'rgba(34,211,238,0.22)',
    title: 'Fast Setup',
    text: 'Start a session in seconds. No registration, no friction — create a room and start estimating.',
  },
  {
    icon: <LuSmartphone />,
    color: 'var(--color-amber)',
    glow: 'rgba(245,158,11,0.22)',
    title: 'Works Everywhere',
    text: 'Fully responsive on phone, tablet, or desktop. Estimation from anywhere, any device.',
  },
  {
    icon: <LuGift />,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.22)',
    title: 'Free Forever',
    text: 'No hidden fees, no paywalls. Planning Poker made open and accessible for every team.',
  },
];

const FeatureCard = ({
  icon,
  color,
  glow,
  title,
  text,
}: {
  icon: ReactNode;
  color: string;
  glow: string;
  title: string;
  text: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 300 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-10, 10]),
    springConfig,
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      className="feature-card"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      variants={staggerChild}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div
        className="feature-card-icon"
        style={{
          color,
          boxShadow: `0 0 20px ${glow}`,
          border: `1px solid ${glow}`,
        }}
      >
        {icon}
      </div>
      <div className="feature-card-title">{title}</div>
      <div className="feature-card-body">{text}</div>
    </motion.div>
  );
};

export const Section3 = () => {
  return (
    <Stack
      className="section-dark-hero"
      paddingBlock={12}
      paddingInline={8}
      gapY={16}
      lg={{ paddingBlock: 24, paddingInline: 32 }}
      md={{ paddingBlock: 16, paddingInline: 16 }}
      alignItems={'center'}
    >
      <motion.div
        style={{ maxWidth: '640px', textAlign: 'center' }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <Text
          fontSize={'4xl'}
          md={{ fontSize: '5xl' }}
          lg={{ fontSize: '6xl' }}
          fontWeight={'bold'}
          lineHeight={'1.15'}
          color={'var(--color-text-primary)'}
          style={{ letterSpacing: '-0.02em' }}
        >
          Why <span className="gradient-text">Choose Us</span>
        </Text>
        <Text
          fontSize={'md'}
          color={'var(--color-text-secondary)'}
          marginTop={4}
          lineHeight={'1.7'}
        >
          Everything your team needs, nothing it doesn&apos;t. Built for speed,
          clarity, and real collaboration.
        </Text>
      </motion.div>

      <motion.div
        className="features-grid"
        style={{ width: '100%', maxWidth: '1100px' }}
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
      >
        <Link href={PATHS.ROOMS}>
          <Button className="cta-primary" fontWeight={'bold'} size={'xl'}>
            Start Now →
          </Button>
        </Link>
      </motion.div>
    </Stack>
  );
};
