import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

type EmojiPickerProps = {
  onEmojiClick: (emoji: string) => void;
};

const EMOJIS = ['❤️', '🎉', '🔥', '😂', '👎', '🤮', '💩'];

export const EmojiPicker: FC<EmojiPickerProps> = ({ onEmojiClick }) => {
  return (
    <Flex gap={2} padding={2} flexWrap="wrap">
      {EMOJIS.map((emoji) => (
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
