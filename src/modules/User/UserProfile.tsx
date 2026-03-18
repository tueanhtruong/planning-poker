import { UserType } from '@/services';
import {
  Button,
  Dialog,
  Input,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';
import { LuUserPen, LuUserPlus } from 'react-icons/lu';
import { useUpsertUser, useUser } from './hooks';

export const UserProfile: FC<{ customDisplayText?: string }> = ({
  customDisplayText,
}) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, refetch } = useUser();

  return (
    <>
      <Stack direction={'row'} alignItems={'center'}>
        {isFetching ? (
          <Spinner size={'md'} />
        ) : (
          <UserProfileDisplay
            customDisplayText={customDisplayText}
            data={data}
            onCreate={() => {
              setOpen(true);
            }}
            onUpdate={() => {
              setOpen(true);
            }}
          />
        )}
      </Stack>
      <ModalAddNewUser
        data={data}
        open={open}
        onCreateSuccess={() => {
          setOpen(false);
          refetch();
        }}
        setOpen={setOpen}
      />
    </>
  );
};

const ModalAddNewUser = ({
  open,
  onCreateSuccess,
  setOpen,
  data,
}: {
  data: UserType | undefined;
  open: boolean;
  onCreateSuccess: () => void;
  setOpen: (open: boolean) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState('');
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
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const UserProfileDisplay = ({
  data,
  onCreate,
  onUpdate,
  customDisplayText,
}: {
  customDisplayText?: string;
  data?: UserType;
  onCreate?: () => void;
  onUpdate?: () => void;
}) => {
  const isHaveUser = !!data;
  if (!isHaveUser) {
    return customDisplayText ? (
      <Button
        onClick={onCreate}
        fontWeight={'bold'}
        fontSize={'lg'}
        variant={'plain'}
        marginBlock={12}
        style={{ color: 'var(--color-cyan)', opacity: 0.9 }}
      >
        {customDisplayText}
      </Button>
    ) : (
      <Button
        onClick={onCreate}
        variant={'outline'}
        data-variant="outline"
        style={{
          borderColor: 'var(--color-indigo)',
          color: 'var(--color-indigo-hover)',
        }}
      >
        <Text fontSize={'md'} display={'none'} md={{ display: 'unset' }}>
          Create Your Profile
        </Text>
        <LuUserPlus size={16} />
      </Button>
    );
  }
  return (
    <Button
      onClick={onUpdate}
      variant={'outline'}
      data-variant="outline"
      style={{
        borderColor: 'var(--color-border-hover)',
        color: 'var(--color-text-primary)',
      }}
    >
      <Text fontSize={'md'} display={'none'} md={{ display: 'unset' }}>
        {data.displayName}
      </Text>
      <LuUserPen size={16} />
    </Button>
  );
};
