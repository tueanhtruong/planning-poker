import { Flex, Text } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const STATS = [
  { value: '100%', label: 'Free Forever' },
  { value: '\u221e', label: 'Team Members' },
  { value: '<2s', label: 'Setup Time' },
  { value: '24/7', label: 'Always On' },
];

export const Section4 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbLeftY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const copyY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <motion.div ref={sectionRef} className="s4-section">
      {/* Parallax orbs */}
      <motion.div
        className="s4-orb s4-orb-left"
        style={{ y: orbLeftY }}
        aria-hidden="true"
      />
      <motion.div
        className="s4-orb s4-orb-right"
        style={{ y: orbRightY }}
        aria-hidden="true"
      />

      <div className="s4-inner">
        {/* Stats row */}
        <motion.div
          className="s4-stats"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="s4-stat">
              <span className="s4-stat-value gradient-text">{value}</span>
              <span className="s4-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        <div className="s4-divider" />

        {/* Copy block with subtle parallax */}
        <motion.div className="s4-copy" style={{ y: copyY }}>
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Text
              fontSize={'4xl'}
              md={{ fontSize: '5xl' }}
              lg={{ fontSize: '6xl' }}
              fontWeight={'bold'}
              lineHeight={'1.1'}
              color={'var(--color-text-primary)'}
              style={{ letterSpacing: '-0.025em' }}
            >
              Boost Productivity
              <br />
              with Our <span className="gradient-text">Innovation</span>
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
          >
            <Text
              fontSize={'md'}
              md={{ fontSize: 'lg' }}
              fontWeight={'light'}
              color={'var(--color-text-secondary)'}
              lineHeight={'1.8'}
              marginTop={6}
              maxWidth={'560px'}
            >
              At Plan Poker, we are committed to revolutionizing your project
              planning process with precision and efficiency. Our platform
              enhances collaboration and decision-making — turning complex
              challenges into manageable, successful outcomes for teams
              worldwide.
            </Text>
          </motion.div>
        </motion.div>

        {/* Footer bar */}
        <motion.div
          className="s4-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Flex gap={3} alignItems={'center'}>
            <Image
              src={'/static/logo.webp'}
              alt={'Logo'}
              width={34}
              height={34}
            />
            <Text
              fontWeight={'bold'}
              color={'var(--color-text-primary)'}
              fontSize={'md'}
            >
              Planning Poker
            </Text>
          </Flex>
          <Flex gap={6} alignItems={'center'}>
            <Text fontSize={'sm'} color={'var(--color-text-muted)'}>
              Made in Vietnam 🇻🇳
            </Text>
            <Text fontSize={'sm'} color={'var(--color-text-muted)'}>
              © 2026 Plan Poker
            </Text>
          </Flex>
        </motion.div>
      </div>
    </motion.div>
  );
};
