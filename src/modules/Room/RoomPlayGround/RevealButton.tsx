import { SessionType } from '@/services';
import { revealReadyVariants } from '@/styles/animations';
import { Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useReveal, useUpsertRoom } from '../hooks';
import { isVoted } from './helpers';

type RevealButtonProps = {
  roomData: SessionType;
};

export const RevealButton: FC<RevealButtonProps> = ({ roomData }) => {
  const { upsert: revealCards } = useReveal();
  const { upsert: updateRoomData } = useUpsertRoom();
  const { id: roomId, participants = {}, revealed } = roomData;

  const hasSomeVoted = Object.values(participants).some((participant) =>
    isVoted(participant.votes),
  );

  const handleClick = () => {
    if (!revealed && hasSomeVoted)
      return revealCards({
        roomId: roomId,
        revealed: !revealed,
      });
    // handle start new game session
    const payload: SessionType = {
      ...roomData,
      revealed: false,
      participants: Object.fromEntries(
        Object.entries(participants).map(([key, participant]) => [
          key,
          { ...participant, id: key, vote: '', votes: [] },
        ]),
      ),
    };
    return updateRoomData(payload);
  };

  return (
    <motion.div
      variants={revealReadyVariants}
      initial="idle"
      animate={hasSomeVoted && !revealed ? 'ready' : 'idle'}
      whileTap="tap"
    >
      <Button
        disabled={!hasSomeVoted}
        onClick={handleClick}
        className={revealed ? 'new-game-button' : 'reveal-button'}
        borderRadius={'md'}
        size={'lg'}
        fontWeight={'bold'}
      >
        {revealed ? 'New Game' : 'Reveal Cards'}
      </Button>
    </motion.div>
  );
};
