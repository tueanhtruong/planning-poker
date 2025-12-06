import { Tooltip } from '@/components/ui/tooltip';
import { useUser } from '@/modules/User';
import { FlyingEmojiType, ParticipantType, SessionType } from '@/services';
import { Flex, Icon, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { FC, PropsWithChildren, useCallback, useRef } from 'react';
import { LuMessageCircleWarning, LuMessageSquareShare } from 'react-icons/lu';
import { useRemoveEmoji, useSendEmoji } from '../hooks';
import { EmojiPicker } from './EmojiPicker';
import { FlyingEmoji } from './FlyingEmoji';
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
  flyingEmojis?: Record<string, FlyingEmojiType>;
  roomId: string;
};

export const RoomPlayers: FC<PropsWithChildren<RoomPlayersProps>> = ({
  myId,
  participants,
  revealed,
  children,
  flyingEmojis = {},
  roomId,
}) => {
  const participantsData = Object.values(participants).filter(Boolean);
  const isRoomHasOneParticipant = participantsData.length === 1;
  const halfOfParticipants = Math.ceil(participantsData.length / 2);
  const { upsert: sendEmoji } = useSendEmoji();
  const { upsert: removeEmoji } = useRemoveEmoji();

  const myCardRef = useRef<HTMLDivElement>(null);
  const lastEmojiSentTime = useRef<number>(0);

  const handleSendEmoji = useCallback((emoji: string, targetUserId: string) => {
    const now = Date.now();
    const timeSinceLastEmoji = now - lastEmojiSentTime.current;

    // Debounce: only allow one emoji per second (1000ms)
    if (timeSinceLastEmoji < 1000) {
      return;
    }

    const myCardElement = myCardRef.current;
    const targetCardElement = document.getElementById(
      `player-card-${targetUserId}`,
    );

    if (!myCardElement || !targetCardElement) return;

    const newFlyingEmoji: FlyingEmojiType = {
      id: `${Date.now()}${Math.random()}`.replaceAll('.', ''),
      emoji,
      fromUserId: myId,
      toUserId: targetUserId,
    };

    sendEmoji({ roomId, payload: newFlyingEmoji });

    lastEmojiSentTime.current = now;
  }, []);

  const handleEmojiComplete = useCallback((id: string) => {
    removeEmoji({ roomId, emojiId: id });
  }, []);

  return (
    <>
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
                onSendEmoji={handleSendEmoji}
                cardRef={isMe ? myCardRef : undefined}
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
                  onSendEmoji={handleSendEmoji}
                  cardRef={isMe ? myCardRef : undefined}
                />
              );
            })}
          </Flex>
        ) : undefined}
      </Flex>
      {/* Render flying emojis */}
      {Object.values(flyingEmojis).map((flyingEmoji) => (
        <FlyingEmoji
          key={flyingEmoji.id}
          {...flyingEmoji}
          onComplete={handleEmojiComplete}
        />
      ))}
    </>
  );
};

const Player: FC<{
  userId: string;
  isMe: boolean;
  participant: ParticipantType;
  revealed?: boolean;
  onSendEmoji: (emoji: string, targetUserId: string) => void;
  cardRef?: React.RefObject<HTMLDivElement>;
}> = ({ userId, participant, isMe, revealed, onSendEmoji, cardRef }) => {
  const { data: userData } = useUser({ id: userId });
  const isVotedV2 = isVoted(participant.votes);
  const lastVote = getLastVote(participant.votes);
  const playerHasReVoted = isHasReVoted(participant.votes);
  const allPreviousVote = getAllPreviousVote(participant.votes);
  const displayName = userData?.displayName ?? 'Unknown';

  const handleEmojiClick = (emoji: string) => {
    onSendEmoji(emoji, userId);
  };

  const cardElement = (
    <div
      id={`player-card-${userId}`}
      ref={cardRef}
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
  );

  return (
    <Flex direction={'column'} gap={1.5} alignItems={'center'}>
      {cardElement}
      <Flex gap={1} alignItems={'center'}>
        <Text fontWeight={''} fontSize={'sm'}>
          {displayName}
        </Text>
        {isMe ? (
          <Text fontWeight={'bold'} fontSize={'sm'} color={'green.500'}>
            • you
          </Text>
        ) : (
          <Tooltip
            content={<EmojiPicker onEmojiClick={handleEmojiClick} />}
            interactive
            contentProps={{ className: 'emoji-picker-tooltip' }}
          >
            <Icon color={'blue.500'} fontSize={20}>
              <LuMessageSquareShare />
            </Icon>
          </Tooltip>
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
