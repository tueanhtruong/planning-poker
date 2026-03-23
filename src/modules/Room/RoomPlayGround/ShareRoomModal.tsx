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
  Text,
} from '@chakra-ui/react';
import { LuShare2 } from 'react-icons/lu';

type ShareRoomModalProps = {
  roomId: string;
};
export const ShareRoomModal = ({ roomId }: ShareRoomModalProps) => {
  const baseAppUrl = window.location.origin;
  const roomUrl = `${baseAppUrl}/rooms/${roomId}`;
  return (
    <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Share Room"
          variant="outline"
          data-variant="outline"
          size={'xs'}
          style={{
            borderColor: 'var(--color-border-hover)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <LuShare2 />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <Dialog.Header>
              <Dialog.Title>
                <Text
                  fontWeight={'bold'}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Share This Room
                </Text>
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={8} alignItems={'stretch'}>
                <QrCode.Root size={'lg'} value={roomUrl} width={'full'}>
                  <QrCode.Frame
                    margin={'auto'}
                    style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      color: 'black',
                    }}
                  >
                    <QrCode.Pattern />
                  </QrCode.Frame>
                </QrCode.Root>
                <Clipboard.Root value={roomUrl} alignSelf={'stretch'}>
                  <Clipboard.Label
                    textStyle="label"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.75rem',
                    }}
                  >
                    Share URL
                  </Clipboard.Label>
                  <InputGroup endElement={<ClipboardIconButton />}>
                    <Clipboard.Input asChild>
                      <Input fontSize={'sm'} />
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
