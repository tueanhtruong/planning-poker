'use client';

import { get, ref, set } from 'firebase/database';
import { database } from '../database';

export type UserType = {
  id: string;
  displayName: string;
  photoURL?: string;
};

export const writeUserData = async ({
  id,
  displayName,
  photoURL,
}: UserType) => {
  await set(ref(database, `users/${id}`), {
    id,
    displayName,
    ...(photoURL ? { photoURL } : {}),
  });
};

export const getUserData = async (id: string) => {
  try {
    const snapshot = await get(ref(database, `users/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
