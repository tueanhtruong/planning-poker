import { UserProfile } from '@/modules/User';
import { Container, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!window) return;
    const handleScroll = () => {
      // You can adjust this value based on when you want the shadow to appear
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Flex
      height={'var(--navHeight)'}
      position={'fixed'}
      top={0}
      left={0}
      right={0}
      gap={16}
      alignItems={'center'}
      backgroundColor={'var(--bgColor)'}
      zIndex={100}
      transition={'0.2s'}
      boxShadow={
        isScrolled
          ? '0px 2px 6px rgba(0, 0, 0, 0.1)'
          : '0px 2px 6px rgba(0, 0, 0, 0)'
      }
    >
      <Container
        maxW="1024px"
        margin={'auto'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingInline={4}
      >
        <Link href={'/'}>
          <Image
            src={'/static/logo.webp'}
            alt={'Logo'}
            width={50}
            height={50}
            title="Home"
          />
        </Link>
        <UserProfile />
      </Container>
    </Flex>
  );
};
