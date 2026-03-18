import { staggerChild, staggerContainer } from '@/styles/animations';
import { Stack, Text } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Gather Your Team',
    body: 'Invite your team members to join a Planning Poker session.',
  },
  {
    num: '02',
    title: 'Choose a Story',
    body: 'The facilitator presents a user story or task that needs an estimate.',
  },
  {
    num: '03',
    title: 'Discuss Briefly',
    body: 'Clarify details as a group — keep it short, keep it focused.',
  },
  {
    num: '04',
    title: 'Vote Secretly',
    body: 'Each member picks a Fibonacci card. No anchoring, no groupthink.',
  },
  {
    num: '05',
    title: 'Reveal Together',
    body: 'Flip all cards simultaneously so estimates stay unbiased.',
  },
  {
    num: '06',
    title: 'Reach Consensus',
    body: 'Discuss outliers and revote until the team settles on a number.',
  },
];

const TiltCard = ({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 32, stiffness: 280 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [12, -12]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-12, 12]),
    springConfig,
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      className="step-card"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      variants={staggerChild}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="step-card-num">{num}</div>
      <div className="step-card-title">{title}</div>
      <div className="step-card-body">{body}</div>
    </motion.div>
  );
};

export const Section2 = () => {
  return (
    <Stack
      id="how-to-play"
      className="section-surface"
      paddingBlock={12}
      paddingInline={8}
      gapY={12}
      lg={{ paddingBlock: 24, paddingInline: 32 }}
      md={{ paddingBlock: 16, paddingInline: 16 }}
      alignItems={'center'}
    >
      <motion.div
        style={{ width: '100%', maxWidth: '720px', textAlign: 'center' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          How to <span className="gradient-text">Play</span> Planning Poker
        </Text>
        <Text
          fontSize={'md'}
          color={'var(--color-text-secondary)'}
          marginTop={4}
          lineHeight={'1.7'}
        >
          Six simple steps to run a smooth, bias-free estimation session.
        </Text>
      </motion.div>

      <motion.div
        className="steps-grid"
        style={{ width: '100%', maxWidth: '1100px' }}
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
      >
        {STEPS.map(({ num, title, body }) => (
          <TiltCard key={num} num={num} title={title} body={body} />
        ))}
      </motion.div>
    </Stack>
  );
};
