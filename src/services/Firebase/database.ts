'use client';
import { getApps, initializeApp } from 'firebase/app';
// import {
//   browserLocalPersistence,
//   getAuth,
//   setPersistence,
// } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
// const app = initializeApp(firebaseConfig);
// setPersistence(getAuth(app), browserLocalPersistence);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
