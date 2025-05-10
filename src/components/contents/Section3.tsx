import { PATHS } from '@/services';
import { Button, Flex, List, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaRegCheckCircle } from 'react-icons/fa';

export const Section3 = () => {
  {
    /* Section 3 */
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
              lineHeight={'1.2'}
            >
              Why Choose Us for Planning Poker?
            </Text>
          </Stack>

          <List.Root
            gap={2}
            variant="plain"
            align="center"
            fontSize={'md'}
            md={{
              fontSize: 'lg',
            }}
            lg={{
              fontSize: 'xl',
            }}
            fontWeight={'light'}
            marginBlockStart={4}
          >
            {/* Real-time Multiplayer instantly. */}
            <List.Item gap={2} alignItems={'start'}>
              <List.Indicator asChild color="green.500">
                <FaRegCheckCircle />
              </List.Indicator>
              <Flex gap={2} flexWrap={'wrap'}>
                <Text fontWeight={'bold'}>
                  Real-time Multiplayer instantly.
                </Text>
                <Text>– Plan and vote with your remote team</Text>
              </Flex>
            </List.Item>
            {/* Simple and Fast Setup */}
            <List.Item gap={2} alignItems={'start'}>
              <List.Indicator asChild color="green.500">
                <FaRegCheckCircle />
              </List.Indicator>
              <Flex gap={2} flexWrap={'wrap'}>
                <Text fontWeight={'bold'}>Simple and Fast Setup</Text>
                <Text>– Start a session in seconds without registration.</Text>
              </Flex>
            </List.Item>
            {/* Mobile Friendly */}
            <List.Item gap={2} alignItems={'start'}>
              <List.Indicator asChild color="green.500">
                <FaRegCheckCircle />
              </List.Indicator>
              <Flex gap={2} flexWrap={'wrap'}>
                <Text fontWeight={'bold'}>Mobile Friendly</Text>
                <Text>– Play from your phone, tablet, or desktop.</Text>
              </Flex>
            </List.Item>
            {/* Free to Use */}
            <List.Item gap={2} alignItems={'start'}>
              <List.Indicator asChild color="green.500">
                <FaRegCheckCircle />
              </List.Indicator>
              <Flex gap={2} flexWrap={'wrap'}>
                <Text fontWeight={'bold'}>Free to Use</Text>
                <Text>
                  – No hidden fees. Planning Poker made easy for everyone.
                </Text>
              </Flex>
            </List.Item>
          </List.Root>

          <Flex
            gap={4}
            alignItems={'center'}
            marginBlockStart={8}
            wrap={'wrap'}
            alignSelf={'center'}
          >
            <Link href={PATHS.ROOMS}>
              <Button width={'fit-content'} fontWeight={'semibold'} size={'xl'}>
                Start Now!
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};
