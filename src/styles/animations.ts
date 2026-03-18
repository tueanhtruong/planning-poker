/**
 * Reusable Framer Motion variants for the Planning Poker design system.
 * Import these in any component — no business logic, purely animation definitions.
 */
import type { Variants } from 'framer-motion';

/* ============================================================
   PAGE / VIEW TRANSITIONS
============================================================ */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

/* ============================================================
   MODAL / DIALOG — scale-up entrance with backdrop blur fade
============================================================ */
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.91, y: 18 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

/* ============================================================
   VOTING CARDS — spring hover lift + glow pulse on select
============================================================ */
export const votingCardVariants: Variants = {
  idle: {
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 28 },
  },
  hover: {
    y: -8,
    scale: 1.05,
    transition: { type: 'spring', stiffness: 420, damping: 22 },
  },
  selected: {
    y: -10,
    scale: 1.08,
    transition: { type: 'spring', stiffness: 420, damping: 22 },
  },
  tap: {
    y: -3,
    scale: 0.96,
    transition: { duration: 0.08 },
  },
};

/* ============================================================
   PLAYER CARDS — avatar scales in on join, slides out on leave
============================================================ */
export const playerCardVariants: Variants = {
  initial: { opacity: 0, scale: 0.65, y: 22 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 26, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: -12,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
};

/* ============================================================
   CARD FLIP REVEAL — 3D rotateY with staggered delay per card
============================================================ */
export const cardFlipVariants: Variants = {
  hidden: {
    rotateY: -180,
    opacity: 0.85,
    transition: { duration: 0 },
  },
  revealed: (delayIndex: number) => ({
    rotateY: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      delay: delayIndex * 0.08,
    },
  }),
};

/* ============================================================
   STAGGER CONTAINER — orchestrates staggerChildren
============================================================ */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/* ============================================================
   STAGGER CHILD — fade + slide up (used inside stagger container)
============================================================ */
export const staggerChild: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 340, damping: 28 },
  },
};

/* ============================================================
   HERO TEXT — large bold reveal
============================================================ */
export const heroHeadlineVariants: Variants = {
  initial: { opacity: 0, y: 36 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const heroSubtextVariants: Variants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 },
  },
};

export const heroCTAVariants: Variants = {
  initial: { opacity: 0, y: 18, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.32 },
  },
};

/* ============================================================
   REVEAL BUTTON — breathing glow pulse when votes are ready
============================================================ */
export const revealReadyVariants: Variants = {
  idle: { scale: 1 },
  ready: {
    scale: [1, 1.025, 1],
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.08 },
  },
};

/* ============================================================
   TOAST — slides in from top-right with bounce
============================================================ */
export const toastVariants: Variants = {
  initial: { opacity: 0, x: 64, scale: 0.94 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 32 },
  },
  exit: {
    opacity: 0,
    x: 44,
    scale: 0.94,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

/* ============================================================
   NUMBER ROLL-UP — stat reveal animation
============================================================ */
export const numberRollVariants: Variants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 26 },
  },
};

/* ============================================================
   BAR CHART — staggered grow-in
============================================================ */
export const barGrowVariants: Variants = {
  initial: { scaleY: 0, opacity: 0 },
  animate: (delayIndex: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 24,
      delay: delayIndex * 0.06,
    },
  }),
};

/* ============================================================
   SECTION ENTRANCE — fade in on scroll
============================================================ */
export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ============================================================
   CONFETTI / PARTICLE BURST — unanimous vote celebration
   (trigger by animating from initial → burst)
============================================================ */
export const particleBurstVariants: Variants = {
  initial: { scale: 0, opacity: 1 },
  burst: (delayIndex: number) => ({
    scale: [0, 1.4, 0],
    opacity: [1, 0.8, 0],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: delayIndex * 0.04,
    },
  }),
};
