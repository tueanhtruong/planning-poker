import {
  get,
  limitToLast,
  off,
  onValue,
  query,
  ref,
  remove,
  set,
} from 'firebase/database';
import { database } from '../database';

export type ParticipantType = {
  vote: string;
  id: string;
  votes: string[];
};

export type SessionType = {
  id: string;
  name: string;
  participants: Record<string, ParticipantType>;
  revealed: boolean;
  createdAt: number;
};

export const watchSession = (
  id: string,
  callback: (session: SessionType) => void,
) => {
  const sessionRef = ref(database, `sessions/${id}`);
  onValue(sessionRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
  return () => off(sessionRef);
};

export const upsertSession = async (session: SessionType) => {
  return await set(ref(database, `sessions/${session.id}`), session)
    .then(() => true)
    .catch(() => false);
};

export const checkSessionExists = async (sessionId: string) => {
  const sessionRef = ref(database, `sessions/${sessionId}`);
  const snapshot = await get(sessionRef);
  const isExists = snapshot.exists();
  if (!isExists) {
    throw new Error('Session does not exist');
  }
  return isExists;
};

export const getLatestSessions = async () => {
  const sessionsRef = ref(database, `sessions`);
  const q = query(sessionsRef, limitToLast(3));
  const snapshot = await get(q);
  if (snapshot.exists()) {
    return Object.values(snapshot.val()).reverse() as SessionType[];
  }
  return [];
};

export const upsertParticipant = async (
  sessionId: string,
  participant: ParticipantType,
) => {
  await set(
    ref(database, `sessions/${sessionId}/participants/${participant.id}`),
    participant,
  );
};

export const removeParticipant = async (
  sessionId: string,
  participantId: string,
) => {
  await remove(
    ref(database, `sessions/${sessionId}/participants/${participantId}`),
  );
};

export const participantVote = async ({
  sessionId,
  participantId,
  vote,
}: {
  sessionId: string;
  participantId: string;
  vote: string;
}) => {
  await set(
    ref(database, `sessions/${sessionId}/participants/${participantId}/vote`),
    vote,
  );
};

export const participantVoteV2 = async ({
  sessionId,
  participantId,
  votes,
}: {
  sessionId: string;
  participantId: string;
  votes: string[];
}) => {
  await set(
    ref(database, `sessions/${sessionId}/participants/${participantId}/votes`),
    votes,
  );
};

export const revealCards = async ({
  sessionId,
  revealed,
}: {
  sessionId: string;
  revealed: boolean;
}) => {
  await set(ref(database, `sessions/${sessionId}/revealed`), revealed);
};
