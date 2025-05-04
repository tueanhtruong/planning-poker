import { get, ref, set } from 'firebase/database';
import { database } from '../database';

export type ApplicationConfig = {
  cards: string[];
};

export const upsertConfig = async (config: ApplicationConfig) => {
  await set(ref(database, `config`), config);
};

export const getConfig = async () => {
  try {
    const snapshot = await get(ref(database, `config`));
    if (snapshot.exists()) {
      return snapshot.val() as ApplicationConfig;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
