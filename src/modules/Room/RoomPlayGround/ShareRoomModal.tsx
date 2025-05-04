import {
  Clipboard,
  CloseButton,
  Dialog,
  IconButton,
  Input,
  InputGroup,
  Portal,
  QrCode,
  Stack,
} from '@chakra-ui/react';
import { LuShare2 } from 'react-icons/lu';

type ShareRoomModalProps = {
  roomId: string;
};
export const ShareRoomModal = ({ roomId }: ShareRoomModalProps) => {
  const baseAppUrl = window.location.origin;
  const roomUrl = `${baseAppUrl}/room/${roomId}`;
  return (
    <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Share Room"
          variant="outline"
          size={'xs'}
          // md={{ size: 'xs' }}
          // lg={{ size: 'sm' }}
        >
          <LuShare2 />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Share This Room</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={8} alignItems={'stretch'}>
                <QrCode.Root size={'lg'} value={roomUrl} width={'full'}>
                  <QrCode.Frame margin={'auto'}>
                    <QrCode.Pattern />
                  </QrCode.Frame>
                </QrCode.Root>
                <Clipboard.Root value={roomUrl} alignSelf={'stretch'}>
                  <Clipboard.Label textStyle="label">Share URL</Clipboard.Label>
                  <InputGroup endElement={<ClipboardIconButton />}>
                    <Clipboard.Input asChild>
                      <Input fontSize={'md'} />
                    </Clipboard.Input>
                  </InputGroup>
                </Clipboard.Root>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const ClipboardIconButton = () => {
  return (
    <Clipboard.Trigger asChild>
      <IconButton variant="surface" size="xs" me="-2">
        <Clipboard.Indicator />
      </IconButton>
    </Clipboard.Trigger>
  );
};
