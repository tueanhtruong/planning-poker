import { generateUUID } from '@/hooks';
import {
  FirebaseUser,
  getUserData,
  signInWithGoogle,
  signOutUser,
  subscribeToAuthState,
  UserType,
  writeUserData,
} from '@/services';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const UserIdKey = 'userIdv2' as const;
export const GoogleUserKey = 'googleUserId' as const;

export const getLocalStorageInfo = (key: string) => {
  if (typeof window !== 'undefined') {
    const val = localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
    return null;
  }
  return null;
};

export const writeLocalStorageInfo = (key: string, value: unknown) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export function useUser(
  options?: Partial<UseQueryOptions<unknown, Error, UserType>> & {
    id?: string;
  },
) {
  const { id, ...rest } = options || {};
  const { data, error, refetch, isFetching } = useQuery<
    unknown,
    Error,
    UserType
  >({
    queryKey: ['users', id ?? 'me'],
    queryFn: () => {
      if (id) {
        return getUserData(id);
      }
      // If there is a Google user ID in local storage, we want to fetch that user's data first
      const googleUserId = getLocalStorageInfo(GoogleUserKey);
      if (googleUserId) {
        return getUserData(googleUserId);
      }
      // If there is no Google user ID, we will check for a guest user ID in local storage
      const userId = getLocalStorageInfo(UserIdKey);
      if (!userId) {
        return new Promise((resolve) => resolve(null));
      }
      return getUserData(userId);
    },
    ...rest,
  });

  return {
    data,
    isFetching,
    error,
    refetch,
  };
}

type UpsertUserPayload = Pick<UserType, 'displayName'> & {
  id?: string;
  photoURL?: string;
  isGoogleUser?: boolean;
};

export const useUpsertUser = (
  options?: UseMutationOptions<void, Error, UpsertUserPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    UpsertUserPayload
  >({
    mutationFn: ({ id, displayName, photoURL, isGoogleUser }) => {
      const payload: UserType = {
        displayName,
        id: id ?? generateUUID(),
        ...(photoURL ? { photoURL } : {}),
      };
      // If there is no ID in the payload, it means we are creating a new user as a guest.
      if (!id) {
        writeLocalStorageInfo(UserIdKey, payload.id);
      }
      // If the user is signing in with Google, we want to store their user ID in local storage
      if (isGoogleUser) {
        writeLocalStorageInfo(GoogleUserKey, payload.id);
      }
      return writeUserData(payload);
    },
    ...options,
  });
  return {
    data,
    upsert: mutate,
    isPending,
    error,
    reset,
  };
};

export function useGoogleAuth({ refetchUser }: { refetchUser: () => void }) {
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { upsert } = useUpsertUser();

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setGoogleUser(user);
      if (user) {
        upsert({
          id: user.uid,
          displayName: user.displayName ?? 'User',
          photoURL: user.photoURL ?? undefined,
          isGoogleUser: true,
        });
      }
      setIsAuthLoading(false);
      setTimeout(() => {
        refetchUser();
      }, 600);
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    setIsAuthLoading(true);
    signInWithGoogle();
  };
  const signOut = () => {
    writeLocalStorageInfo(GoogleUserKey, '');
    signOutUser();
  };

  return { googleUser, isAuthLoading, signIn, signOut };
}

export function useWatchUserInRoom({ reJoinRoom }: { reJoinRoom: () => void }) {
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setTimeout(() => {
        reJoinRoom();
      }, 600);
    });
    return unsubscribe;
  }, []);

  return;
}
