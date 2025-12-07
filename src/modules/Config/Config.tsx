import { useEffect } from 'react';
import { useConfig, useUpsertConfig } from './hook';

const CARDS_CONFIG = [
  '0',
  '0.5',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '21',
  '44',
  '65',
  '?',
  '☕',
  '🏳️‍🌈',
];

const EMOJIS_CONFIG = ['❤️', '🎉', '🔥', '😂', '👎', '🤮', '💩'];

export const Config = () => {
  const { data } = useConfig();
  const { upsert } = useUpsertConfig();
  useEffect(() => {
    if (typeof data !== 'undefined' && data === null) {
      upsert({
        cards: CARDS_CONFIG,
        emojis: EMOJIS_CONFIG,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return null;
};
