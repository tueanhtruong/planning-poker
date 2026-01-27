'use client';

import { UserProfile } from '@/modules/User';
import { UserType } from '@/services';
import { Button, Spinner, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { LuView } from 'react-icons/lu';
import { useJoinRoom, useRoomInfo } from '../hooks';
import { CardsGroup } from './CardsGroup';
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
      <Spinner size={'xl'} />
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

  // This is used to prevent calling the joinRoom when user leaving room
  const calledJoinRoomRef = useRef(false);

  const handlePreviewRoom = () => {
    const baseAppUrl = window.location.origin;
    const previewUrl = `${baseAppUrl}/preview/${id}`;
    window.open(previewUrl, '_blank');
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    const isUserInRoom = Boolean(data.participants?.[userId]);
    // Check if the user is already in the room
    if (!isUserInRoom && !calledJoinRoomRef.current) {
      joinRoom({ roomId: id, userId: userId });
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
        <Spinner size={'xl'} />
      </Stack>
    );
  }
  const title = `${preview ? 'Preview - ' : 'Room - '}${data.name}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Stack alignItems={'center'} flex={1} paddingBlockStart={14}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={4}
          height={50}
          position={'fixed'}
          top={15}
          zIndex={200}
          left={'calc(max(50% - 512px, 0px) + 82px)'}
          maxWidth={'calc(min(100%, 1024px) - 168px)'}
        >
          <Text
            fontSize={'lg'}
            md={{ fontSize: 'xl' }}
            lg={{ fontSize: '2xl' }}
            fontWeight={'bold'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            {data.name}
          </Text>
          <ShareRoomModal roomId={id} />
          <Button size={'xs'} variant={'outline'} onClick={handlePreviewRoom}>
            <LuView />
            Preview
          </Button>
        </Stack>
        <RoomPlayers
          myId={userId}
          participants={data.participants ?? {}}
          revealed={data.revealed}
          roomId={id}
          flyingEmojis={data.flyingEmojis ?? {}}
        >
          <Stack>
            <RevealButton roomData={data} />
          </Stack>
        </RoomPlayers>
        {preview ? null : (
          <CardsGroup
            userId={userId}
            roomId={id}
            revealed={data.revealed}
            participants={data.participants ?? {}}
          />
        )}
      </Stack>
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
