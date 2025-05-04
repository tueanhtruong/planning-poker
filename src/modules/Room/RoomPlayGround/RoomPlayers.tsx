import { useUser } from '@/modules/User';
import { ParticipantType, SessionType } from '@/services';
import { Flex, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
type RoomPlayersProps = {
  myId: string;
  participants: SessionType['participants'];
  revealed?: boolean;
};

export const RoomPlayers: FC<PropsWithChildren<RoomPlayersProps>> = ({
  myId,
  participants,
  revealed,
  children,
}) => {
  const participantsData = Object.values(participants).filter(Boolean);
  const isRoomHasOneParticipant = participantsData.length === 1;
  const halfOfParticipants = Math.ceil(participantsData.length / 2);

  return (
    <Flex
      gap={6}
      alignItems={'center'}
      direction={'column'}
      justifyContent={'center'}
      flexGrow={1}
      paddingBlock={4}
    >
      <Flex gap={6} wrap={'wrap'} justifyContent={'center'}>
        {participantsData.slice(0, halfOfParticipants).map((participant) => {
          const userId = participant.id;
          const isMe = myId === userId;
          return (
            <Player
              key={`card-user-${userId}`}
              userId={userId}
              isMe={isMe}
              participant={participant}
              revealed={revealed}
            />
          );
        })}
      </Flex>
      {children}
      {!isRoomHasOneParticipant ? (
        <Flex gap={6} wrap={'wrap'} justifyContent={'center'}>
          {participantsData.slice(halfOfParticipants).map((participant) => {
            const userId = participant.id;
            const isMe = myId === userId;
            return (
              <Player
                key={`card-user-${userId}`}
                userId={userId}
                isMe={isMe}
                participant={participant}
                revealed={revealed}
              />
            );
          })}
        </Flex>
      ) : undefined}
    </Flex>
  );
};

const Player: FC<{
  userId: string;
  isMe: boolean;
  participant: ParticipantType;
  revealed?: boolean;
}> = ({ userId, participant, isMe, revealed }) => {
  const { data: userData } = useUser({ id: userId });
  const isVoted = Boolean(participant.vote);
  const displayName = userData?.displayName ?? 'Unknown';

  return (
    <Flex direction={'column'} gap={1.5} alignItems={'center'}>
      <div
        className={classNames(
          'card',
          isVoted ? 'wobble-animation card-voted' : '',
          revealed ? '' : 'card-hidden',
        )}
      >
        <div className="back"></div>
        <div className="front">
          <Text fontSize={'2xl'} margin={'auto'} fontWeight={'bold'}>
            {participant.vote || '--'}
          </Text>
        </div>
      </div>
      <Flex gap={1} alignItems={'center'}>
        <Text fontWeight={''} fontSize={'sm'}>
          {displayName}
        </Text>
        {isMe && (
          <Text fontWeight={'bold'} fontSize={'sm'} color={'green.500'}>
            • you
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
