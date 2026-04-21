'use client';

import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from '../database';

export type FirebaseUser = User;

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signOutUser = () => firebaseSignOut(auth);

export const subscribeToAuthState = (
  callback: (user: FirebaseUser | null) => void,
) => onAuthStateChanged(auth, callback);
