import { UserType } from '@/services';
import {
  Button,
  Dialog,
  Input,
  Portal,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useUpsertUser } from './hooks';

export const ModalAddNewUser = ({
  open,
  onCreateSuccess,
  setOpen,
  data,
  onGoogleSignIn,
}: {
  data: UserType | undefined;
  open: boolean;
  onCreateSuccess: () => void;
  setOpen: (open: boolean) => void;
  onGoogleSignIn: () => void;
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isUpdate = !!data;
  const { upsert, isPending } = useUpsertUser({
    onSuccess: () => {
      onCreateSuccess();
    },
  });

  const handleSaveUser = async () => {
    const name = inputRef.current?.value;
    if (!name) {
      return setErrorMessage('Please enter your name');
    }
    if (errorMessage) setErrorMessage('');
    upsert({
      id: data?.id,
      displayName: name,
    });
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await onGoogleSignIn();
      setOpen(false);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
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
                {isUpdate ? 'Update' : 'Create'} Your Profile
              </Text>
            </Dialog.Header>
            <Dialog.Body>
              <Stack direction={'column'} gap={4}>
                <>
                  <Button
                    variant={'outline'}
                    data-variant="outline"
                    width={'full'}
                    loading={isGoogleLoading}
                    onClick={handleGoogleSignIn}
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <FcGoogle size={18} />
                    Sign in with Google
                  </Button>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    gap={3}
                    marginBlock={1}
                  >
                    <Separator flex={1} />
                    <Text
                      fontSize={'md'}
                      color={'var(--color-text-secondary)'}
                      flexShrink={0}
                    >
                      or continue as guest
                    </Text>
                    <Separator flex={1} />
                  </Stack>
                </>

                <Stack direction={'column'} gap={4} alignItems={'flex-end'}>
                  <Text
                    fontSize={'xs'}
                    md={{ fontSize: 'sm' }}
                    alignSelf={'flex-start'}
                    fontWeight={'light'}
                    marginBlockEnd={-2}
                    color={'var(--color-text-secondary)'}
                  >
                    Simply provide your display name.
                  </Text>
                  <Input
                    placeholder="Enter your name"
                    ref={inputRef}
                    defaultValue={data?.displayName}
                    fontSize={'md'}
                  />
                  {errorMessage ? (
                    <Text
                      color={'red.400'}
                      fontSize={'xs'}
                      md={{ fontSize: 'sm' }}
                      alignSelf={'flex-start'}
                      fontWeight={'light'}
                      marginBlockStart={-2}
                    >
                      {errorMessage}
                    </Text>
                  ) : undefined}
                  <Button
                    className="cta-primary"
                    loading={isPending}
                    onClick={handleSaveUser}
                    width={'fit-content'}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
