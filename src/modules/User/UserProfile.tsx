import { UserType } from '@/services';
import { Spinner, Stack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { GoogleUserDisplay } from './GoogleUserDisplay';
import { useGoogleAuth, useUser } from './hooks';
import { ModalAddNewUser } from './ModalAddNewUser';
import { UserProfileDisplay } from './UserProfileDisplay';

const DisplayUserProfile: FC<{
  isLoading?: boolean;
  data?: UserType;
  isGoogleUser?: boolean;
  onGoogleSignOut: () => void;
  onCreate?: () => void;
  onUpdate?: () => void;
}> = ({
  isLoading,
  data,
  isGoogleUser,
  onGoogleSignOut,
  onCreate,
  onUpdate,
}) => {
  if (isLoading) {
    return <Spinner size={'md'} />;
  }
  if (!data) {
    return null;
  }
  if (isGoogleUser) {
    return (
      <GoogleUserDisplay
        displayName={data.displayName ?? ''}
        photoURL={data.photoURL ?? undefined}
        onSignOut={onGoogleSignOut}
      />
    );
  }
  return (
    <UserProfileDisplay data={data} onCreate={onCreate} onUpdate={onUpdate} />
  );
};

export const UserProfile: FC<{ customDisplayText?: string }> = ({
  customDisplayText,
}) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, refetch } = useUser();
  const { googleUser, signIn, isAuthLoading, signOut } = useGoogleAuth({
    refetchUser: refetch,
  });

  const isLoading = (isFetching || isAuthLoading) && !data;

  return (
    <>
      <Stack direction={'row'} alignItems={'center'}>
        <DisplayUserProfile
          isLoading={isLoading}
          data={data}
          isGoogleUser={!!googleUser}
          onGoogleSignOut={signOut}
          onCreate={() => setOpen(true)}
          onUpdate={() => setOpen(true)}
        />
      </Stack>
      {!googleUser && (
        <ModalAddNewUser
          data={data}
          open={open}
          onCreateSuccess={() => {
            setOpen(false);
            refetch();
          }}
          setOpen={setOpen}
          onGoogleSignIn={signIn}
        />
      )}
    </>
  );
};
