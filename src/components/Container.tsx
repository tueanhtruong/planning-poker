import { Container } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const CommonContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxW="1024px"
      marginInline={'auto'}
      display={'flex'}
      flexGrow={1}
      padding={4}
      paddingBlockStart={'var(--navHeight)'}
    >
      {children}
    </Container>
  );
};
