import { Spinner, Text } from '@chakra-ui/react';
import { useRef } from 'react';

import { useConfig } from '@/modules/Config';
import { SessionType } from '@/services';
import { AnimatePresence, motion } from 'framer-motion';
import { useVoteV2 } from '../hooks';
import { getLastVote } from './helpers';

type CardsGroupProps = {
  revealed: boolean;
  roomId: string;
  userId: string;
  participants: SessionType['participants'];
};

const InnerCardsGroup = ({
  roomId,
  userId,
  participants,
  revealed,
}: CardsGroupProps) => {
  const { data, isFetching } = useConfig();
  const { upsert: voteV2 } = useVoteV2();
  const cardButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const myRecord = participants[userId];
  if (isFetching)
    return (
      <Spinner
        size={'lg'}
        style={{ color: 'var(--color-indigo)', margin: '24px' }}
      />
    );

  if (!data) {
    return null;
  }

  const handleCardSelect = (selectedValue: string) => {
    const currentVotes = myRecord?.votes || [];
    const myLastVote = getLastVote(currentVotes);
    if (myLastVote === selectedValue) {
      return;
    }
    const nextVotes = revealed
      ? [...currentVotes, selectedValue]
      : [selectedValue];
    voteV2({
      roomId: roomId,
      userId: userId,
      votes: nextVotes,
    });
  };

  const lastVote = getLastVote(myRecord?.votes);

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const isNextKey = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const isPreviousKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp';

    if (!isNextKey && !isPreviousKey) {
      return;
    }

    event.preventDefault();

    const nextIndex = isNextKey ? index + 1 : index - 1;
    const nextButton = cardButtonRefs.current[nextIndex];

    if (nextButton) {
      nextButton.focus();
    }
  };

  return (
    <motion.div
      style={{
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        marginBlock: '16px',
        maxWidth: '560px',
        width: '100%',
      }}
      // initial={{ opacity: 0, y: 32 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Text
        textAlign={'center'}
        mb={3}
        fontWeight={'light'}
        fontSize={'sm'}
        color={'var(--color-text-secondary)'}
        style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}
      >
        Choose your card 👇
      </Text>
      <motion.div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '16px 24px',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
        }}
        // variants={staggerContainer}
        // initial="initial"
        // animate="animate"
      >
        <AnimatePresence>
          {data.cards.map((card, index) => {
            const isSelected = lastVote === card;
            return (
              <motion.button
                key={`poker-card-${card}`}
                ref={(element) => {
                  cardButtonRefs.current[index] = element;
                }}
                // variants={staggerChild}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: -1, scale: 0.98 }}
                onClick={() => handleCardSelect(card)}
                onKeyDown={(event) => handleCardKeyDown(event, index)}
                className={`voting-card${isSelected ? ' voting-card-selected' : ''}`}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  {card}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const CardsGroup = InnerCardsGroup;
