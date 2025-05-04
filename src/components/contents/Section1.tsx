import { PATHS } from '@/services';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export const Section1 = () => {
  {
    /* Section 1 */
  }
  return (
    <Stack
      direction={'column'}
      minHeight={'100%'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={40}
    >
      <Stack
        backgroundColor={'rgb(0, 0, 0, 0.1)'}
        paddingBlock={4}
        paddingInline={8}
        gapY={6}
        lg={{ paddingBlock: 16, paddingInline: 32 }}
        md={{ paddingBlock: 8, paddingInline: 16 }}
        width={'full'}
      >
        <Stack>
          <Stack>
            <Text
              fontSize={'4xl'}
              md={{
                fontSize: '5xl',
              }}
              lg={{
                fontSize: '6xl',
              }}
              fontWeight={'bold'}
              width={'80%'}
              lineHeight={'1.2'}
            >
              The FREE Online Planning Poker Tool
            </Text>
          </Stack>
          <Text
            width={'80%'}
            marginBlockStart={4}
            fontSize={'md'}
            md={{
              fontSize: 'lg',
            }}
            lg={{
              fontSize: 'xl',
            }}
            fontWeight={'light'}
          >
            Revolutionize your team&apos;s approach with Plan Poker, designed to
            streamline efficiency in agile project management. Join teams
            worldwide to promote collaborative and accurate estimations.
          </Text>
          <Flex
            gap={4}
            alignItems={'center'}
            marginBlockStart={4}
            wrap={'wrap'}
          >
            <Link href={PATHS.ROOMS}>
              <Button width={'fit-content'} fontWeight={'semibold'} size={'lg'}>
                Start Planning Smarter!
              </Button>
            </Link>
            <Image
              src={'/static/logo.webp'}
              alt={'Logo'}
              width={48}
              height={48}
            />
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};
