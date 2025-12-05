'use client';

import { UserProfile } from '@/modules/User';
import { UserType } from '@/services';
import { Button, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
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

export const RoomPlayGround = ({
  id,
  userData,
  preview = false,
}: RoomPlayGroundProps) => {
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
    if (!userData) {
      return;
    }
    if (!data) {
      return;
    }
    const isUserInRoom = Boolean(data.participants?.[userData.id]);
    // Check if the user is already in the room
    if (!isUserInRoom && !calledJoinRoomRef.current) {
      joinRoom({ roomId: id, userId: userData.id });
      calledJoinRoomRef.current = true;
      return;
    }
    if (isUserInRoom) {
      calledJoinRoomRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userData]);

  if (!userData) {
    return <UserProfile customDisplayText={'Please set your username first'} />;
  }
  if (!data) {
    return (
      <Stack height={720} alignItems={'center'} justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Stack>
    );
  }

  return (
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
        myId={userData.id}
        participants={data.participants ?? {}}
        revealed={data.revealed}
      >
        <Stack>
          <RevealButton roomData={data} />
        </Stack>
      </RoomPlayers>
      {preview ? null : (
        <CardsGroup
          userId={userData?.id ?? ''}
          roomId={id}
          revealed={data.revealed}
          participants={data.participants ?? {}}
        />
      )}
    </Stack>
  );
};
