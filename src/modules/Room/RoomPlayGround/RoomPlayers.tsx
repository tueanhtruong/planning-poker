import { Tooltip } from '@/components/ui/tooltip';
import { useUser } from '@/modules/User';
import { ParticipantType, SessionType } from '@/services';
import { Flex, Icon, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import { LuMessageCircleWarning } from 'react-icons/lu';
import {
  getAllPreviousVote,
  getLastVote,
  isHasReVoted,
  isVoted,
} from './helpers';
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
  // const isVoted = Boolean(participant.vote);
  const isVotedV2 = isVoted(participant.votes);
  const lastVote = getLastVote(participant.votes);
  const playerHasReVoted = isHasReVoted(participant.votes);
  const allPreviousVote = getAllPreviousVote(participant.votes);
  const displayName = userData?.displayName ?? 'Unknown';

  return (
    <Flex direction={'column'} gap={1.5} alignItems={'center'}>
      <div
        className={classNames(
          'card',
          { 'card-hidden': !revealed },
          { 'wobble-animation card-voted': isVotedV2 },
        )}
      >
        <div className="back"></div>
        <div
          className={classNames('front', { 'card-re-voted': playerHasReVoted })}
        >
          <Text fontSize={'2xl'} margin={'auto'} fontWeight={'bold'}>
            {lastVote ?? '--'}
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
        {allPreviousVote && revealed && (
          <Tooltip
            content={'Previous votes: ' + allPreviousVote}
            interactive
            positioning={{ placement: 'top' }}
            contentProps={{ className: 'tooltip-content' }}
          >
            <Icon color={'yellow.500'} fontSize={20}>
              <LuMessageCircleWarning />
            </Icon>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
};
