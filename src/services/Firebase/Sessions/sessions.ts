import { off, onValue, ref, remove, set } from 'firebase/database';
import { database } from '../database';

export type ParticipantType = {
  vote: string;
  id: string;
};

export type SessionType = {
  id: string;
  name: string;
  participants: Record<string, ParticipantType>;
  revealed: boolean;
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
  await set(ref(database, `sessions/${session.id}`), session);
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

export const revealCards = async ({
  sessionId,
  revealed,
}: {
  sessionId: string;
  revealed: boolean;
}) => {
  await set(ref(database, `sessions/${sessionId}/revealed`), revealed);
};
