import { useConfig } from '@/modules/Config';
import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

type EmojiPickerProps = {
  onEmojiClick: (emoji: string) => void;
};

const EMOJIS = ['❤️', '🎉', '🔥', '😂', '👎', '🤮', '💩'];

export const EmojiPicker: FC<EmojiPickerProps> = ({ onEmojiClick }) => {
  const { data } = useConfig({ enabled: false });

  return (
    <Flex gap={2} padding={2} flexWrap="wrap">
      {data?.emojis.map((emoji) => (
        <button
          key={`emoji-${emoji}`}
          onClick={(e) => {
            e.stopPropagation();
            onEmojiClick(emoji);
          }}
          className="emoji-button"
        >
          {emoji}
        </button>
      ))}
    </Flex>
  );
};
