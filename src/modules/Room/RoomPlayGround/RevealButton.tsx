import { SessionType } from '@/services';
import { Button } from '@chakra-ui/react';
import classNames from 'classnames';
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
    <Button
      disabled={!hasSomeVoted}
      onClick={handleClick}
      className={classNames('glow-button', {
        'glow-button-action': hasSomeVoted || revealed,
      })}
      borderRadius={'md'}
      size={'lg'}
      fontWeight={'bold'}
    >
      {revealed ? 'New Game' : 'Reveal Cards'}
    </Button>
  );
};
