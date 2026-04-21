import { Avatar, Button, Dialog, Portal, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LuLogOut, LuUserPen } from 'react-icons/lu';

export const GoogleUserDisplay = ({
  displayName,
  photoURL,
  onSignOut,
}: {
  displayName: string;
  photoURL?: string;
  onSignOut: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={'outline'}
        data-variant="outline"
        style={{
          borderColor: 'var(--color-border-hover)',
          color: 'var(--color-text-primary)',
        }}
      >
        <Avatar.Root size="xs">
          <Avatar.Image src={photoURL} />
          <Avatar.Fallback>{displayName[0]}</Avatar.Fallback>
        </Avatar.Root>
        <Text fontSize={'md'} display={'none'} md={{ display: 'unset' }}>
          {displayName}
        </Text>
        <LuUserPen size={16} />
      </Button>
      <Dialog.Root
        open={open}
        onOpenChange={({ open }) => setOpen(open)}
        placement={'top'}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              marginBlock={32}
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <Dialog.Header>
                <Text
                  fontSize={'lg'}
                  fontWeight={'bold'}
                  color={'var(--color-text-primary)'}
                >
                  Your Profile
                </Text>
              </Dialog.Header>
              <Dialog.Body>
                <Stack direction={'column'} gap={4} alignItems={'center'}>
                  <Avatar.Root size="xl">
                    <Avatar.Image src={photoURL} />
                    <Avatar.Fallback>{displayName[0]}</Avatar.Fallback>
                  </Avatar.Root>
                  <Text
                    fontSize={'md'}
                    fontWeight={'semibold'}
                    color={'var(--color-text-primary)'}
                  >
                    {displayName}
                  </Text>
                  <Button
                    variant={'outline'}
                    data-variant="outline"
                    width={'full'}
                    onClick={() => {
                      onSignOut();
                      setOpen(false);
                    }}
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <LuLogOut size={16} />
                    Sign out
                  </Button>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
