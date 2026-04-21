import { UserType } from '@/services';
import { Button, Text } from '@chakra-ui/react';
import { LuUserPen, LuUserPlus } from 'react-icons/lu';

export const UserProfileDisplay = ({
  data,
  onCreate,
  onUpdate,
  customDisplayText,
}: {
  customDisplayText?: string;
  data?: UserType;
  onCreate?: () => void;
  onUpdate?: () => void;
}) => {
  const isHaveUser = !!data;
  if (!isHaveUser) {
    return customDisplayText ? (
      <Button
        onClick={onCreate}
        fontWeight={'bold'}
        fontSize={'lg'}
        variant={'plain'}
        marginBlock={12}
        style={{ color: 'var(--color-cyan)', opacity: 0.9 }}
      >
        {customDisplayText}
      </Button>
    ) : (
      <Button
        onClick={onCreate}
        variant={'outline'}
        data-variant="outline"
        style={{
          borderColor: 'var(--color-indigo)',
          color: 'var(--color-indigo-hover)',
        }}
      >
        <Text fontSize={'md'} display={'none'} md={{ display: 'unset' }}>
          Create Your Profile
        </Text>
        <LuUserPlus size={16} />
      </Button>
    );
  }
  return (
    <Button
      onClick={onUpdate}
      variant={'outline'}
      data-variant="outline"
      style={{
        borderColor: 'var(--color-border-hover)',
        color: 'var(--color-text-primary)',
      }}
    >
      <Text fontSize={'md'} display={'none'} md={{ display: 'unset' }}>
        {data.displayName}
      </Text>
      <LuUserPen size={16} />
    </Button>
  );
};
