import { Tooltip } from '@/components/ui/tooltip';
import { useUser } from '@/modules/User';
import { FlyingEmojiType, ParticipantType, SessionType } from '@/services';
import { playerCardVariants } from '@/styles/animations';
import { Flex, Icon, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
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
  canSendEmoji?: boolean;
};

export const RoomPlayers: FC<PropsWithChildren<RoomPlayersProps>> = ({
  myId,
  participants,
  revealed,
  children,
  flyingEmojis = {},
  roomId,
  canSendEmoji = true,
}) => {
  const participantsData = Object.values(participants).filter(Boolean);
  const isRoomHasOneParticipant = participantsData.length === 1;
  const halfOfParticipants = Math.ceil(participantsData.length / 2);
  const { upsert: sendEmoji } = useSendEmoji();
  const { upsert: removeEmoji } = useRemoveEmoji();

  const myCardRef = useRef<HTMLDivElement>(null);
  const lastEmojiSentTime = useRef<number>(0);

  const handleSendEmoji = useCallback(
    (emoji: string, targetUserId: string) => {
      if (!canSendEmoji) {
        return;
      }

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
    },
    [canSendEmoji, myId, roomId, sendEmoji],
  );

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
        paddingTop={12}
        paddingBottom={8}
      >
        <Flex gap={6} wrap={'wrap'} justifyContent={'center'}>
          <AnimatePresence>
            {participantsData
              .slice(0, halfOfParticipants)
              .map((participant) => {
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
                    canSendEmoji={canSendEmoji && !participant.preview}
                    cardRef={isMe ? myCardRef : undefined}
                  />
                );
              })}
          </AnimatePresence>
        </Flex>
        {children}
        {!isRoomHasOneParticipant ? (
          <Flex gap={6} wrap={'wrap'} justifyContent={'center'}>
            <AnimatePresence>
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
                    canSendEmoji={canSendEmoji && !participant.preview}
                    cardRef={isMe ? myCardRef : undefined}
                  />
                );
              })}
            </AnimatePresence>
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
  canSendEmoji?: boolean;
  cardRef?: React.RefObject<HTMLDivElement>;
}> = ({
  userId,
  participant,
  isMe,
  revealed,
  onSendEmoji,
  canSendEmoji = true,
  cardRef,
}) => {
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
        { 'card-voted': isVotedV2 },
      )}
    >
      <div className="back"></div>
      <div
        className={classNames('front', { 'card-re-voted': playerHasReVoted })}
      >
        <Text
          fontSize={'2xl'}
          margin={'auto'}
          fontWeight={'bold'}
          color={revealed ? 'var(--color-text-primary)' : 'transparent'}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {lastVote ?? '--'}
        </Text>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={playerCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <Flex direction={'column'} gap={1.5} alignItems={'center'}>
        {cardElement}
        <Flex gap={1} alignItems={'center'}>
          <Text
            fontWeight={'medium'}
            fontSize={'sm'}
            color={'var(--color-text-secondary)'}
          >
            {displayName}
          </Text>
          {isMe ? (
            <Text
              fontWeight={'bold'}
              fontSize={'sm'}
              className="player-voted-dot"
            >
              • you
            </Text>
          ) : canSendEmoji ? (
            <Tooltip
              content={<EmojiPicker onEmojiClick={handleEmojiClick} />}
              interactive
              contentProps={{ className: 'emoji-picker-tooltip' }}
            >
              <Icon
                style={{
                  color: 'var(--color-indigo-hover)',
                  cursor: 'pointer',
                }}
                fontSize={18}
              >
                <LuMessageSquareShare />
              </Icon>
            </Tooltip>
          ) : null}
          {allPreviousVote && revealed && (
            <Tooltip
              content={'Previous votes: ' + allPreviousVote}
              interactive
              positioning={{ placement: 'top' }}
              contentProps={{ className: 'tooltip-content' }}
            >
              <Icon
                style={{ color: 'var(--color-amber)', cursor: 'pointer' }}
                fontSize={18}
              >
                <LuMessageCircleWarning />
              </Icon>
            </Tooltip>
          )}
        </Flex>
        {/* Voted / waiting indicator dot */}
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isVotedV2
              ? 'var(--color-amber)'
              : 'var(--color-text-muted)',
            boxShadow: isVotedV2 ? 'var(--shadow-glow-amber)' : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </Flex>
    </motion.div>
  );
};
