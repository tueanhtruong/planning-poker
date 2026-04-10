'use client';

import { UserProfile } from '@/modules/User';
import { UserType } from '@/services';
import { Spinner, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useJoinRoom, useRoomInfo } from '../hooks';
import { AverageSidebar } from './AverageSidebar';
import { CardsGroup } from './CardsGroup';
import { PreviewModeSwitch } from './PreviewModeSwitch';
import { PreviewOverlay } from './PreviewOverlay';
import { RevealButton } from './RevealButton';
import { RoomPlayers } from './RoomPlayers';
import { ShareRoomModal } from './ShareRoomModal';

type RoomPlayGroundProps = {
  id: string;
  userData?: UserType;
  preview?: boolean;
};

const WrapperRoomPlayGround = ({
  id,
  userData,
  preview = false,
}: RoomPlayGroundProps) => {
  const [renderPlayGround, setRenderPlayGround] = useState(false);

  useEffect(() => {
    if (!userData) {
      return;
    }
    const timer = setTimeout(() => {
      setRenderPlayGround(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [userData]);

  // this wrapper is check if userData is loading or not
  // if userData is undefined, we can show a loading spinner
  if (!userData)
    return <UserProfile customDisplayText={'Please set your username first'} />;

  // if userData is defined, we can render the RoomPlayGround after 800ms

  return renderPlayGround ? (
    <InnerRoomPlayGround id={id} userId={userData.id} preview={preview} />
  ) : (
    <Stack height={720} alignItems={'center'} justifyContent={'center'}>
      <Spinner size={'xl'} style={{ color: 'var(--color-indigo)' }} />
    </Stack>
  );
};

export const InnerRoomPlayGround = ({
  id,
  preview,
  userId,
}: RoomPlayGroundProps & { userId: string }) => {
  const { data } = useRoomInfo({ id });
  const { upsert: joinRoom } = useJoinRoom();
  const router = useRouter();
  const isPreview = router.query.preview === 'true';

  // This is used to prevent calling the joinRoom when user leaving room
  const calledJoinRoomRef = useRef(false);

  const applyTogglePreview = useCallback(
    (nextPreview: boolean) => {
      const query = { ...router.query };
      if (nextPreview) {
        query.preview = 'true';
      } else {
        delete query.preview;
      }
      router.replace({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });
      joinRoom({ roomId: id, userId, preview: nextPreview });
    },
    [joinRoom, id, userId, router],
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    const isUserInRoom = Boolean(data.participants?.[userId]);
    // Check if the user is already in the room or if the joinRoom function has been called before
    // => if not, call the joinRoom function to add the user to the room
    if (!isUserInRoom || !calledJoinRoomRef.current) {
      joinRoom({ roomId: id, userId: userId, preview: isPreview });
      calledJoinRoomRef.current = true;
      return;
    }
    if (isUserInRoom) {
      calledJoinRoomRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) {
    return (
      <Stack height={720} alignItems={'center'} justifyContent={'center'}>
        <Spinner size={'xl'} style={{ color: 'var(--color-indigo)' }} />
      </Stack>
    );
  }

  const participants = data.participants ?? {};
  const roomPlayersParticipants = Object.fromEntries(
    Object.entries(participants).filter(([_, participant]) => {
      return !participant.preview;
    }),
  );

  const title = `${isPreview ? 'Preview - ' : 'Room - '}${data.name}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <PreviewOverlay preview={isPreview} />
      <Stack alignItems={'center'} flex={1} paddingBlockStart={14}>
        {/* Room name header bar */}
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={4}
          height={50}
          position={'fixed'}
          top={'12px'}
          zIndex={200}
          left={'calc(max(50% - 512px, 0px) + 82px)'}
          maxWidth={'calc(min(100%, 1024px) - 168px)'}
          className="room-header-bar"
        >
          <Text
            fontSize={'lg'}
            md={{ fontSize: 'xl' }}
            lg={{ fontSize: '2xl' }}
            fontWeight={'bold'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            color={'var(--color-text-primary)'}
          >
            {data.name}
          </Text>
          <ShareRoomModal roomId={id} />
        </Stack>

        {/* Poker table + players */}
        <RoomPlayers
          myId={userId}
          participants={roomPlayersParticipants}
          revealed={data.revealed}
          roomId={id}
          flyingEmojis={data.flyingEmojis ?? {}}
          canSendEmoji={!isPreview}
        >
          <Stack className="poker-table-center" padding={4}>
            <RevealButton roomData={data} />
          </Stack>
        </RoomPlayers>

        {/* Voting card tray */}
        {isPreview ? null : (
          <CardsGroup
            userId={userId}
            roomId={id}
            revealed={data.revealed}
            participants={participants}
          />
        )}
      </Stack>

      {/* Average / results sidebar */}
      <AverageSidebar participants={participants} revealed={!!data.revealed}>
        <PreviewModeSwitch
          isPreview={isPreview}
          onApplyToggle={applyTogglePreview}
        />
      </AverageSidebar>
    </>
  );
};

export const RoomPlayGround = ({
  id,
  userData,
  preview = false,
}: RoomPlayGroundProps) => {
  return (
    <WrapperRoomPlayGround id={id} userData={userData} preview={preview} />
  );
};
