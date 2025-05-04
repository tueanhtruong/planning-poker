import { List, Stack, Text } from '@chakra-ui/react';
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md';

export const Section2 = () => {
  {
    /* Section 2 */
  }
  return (
    <Stack
      backgroundColor={'var(--contentCardBg)'}
      paddingBlock={4}
      paddingInline={8}
      gapY={6}
      lg={{ paddingBlock: 16, paddingInline: 32 }}
      md={{ paddingBlock: 8, paddingInline: 16 }}
      alignItems={'center'}
    >
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
        color={'white'}
        width={'80%'}
        textWrap={'wrap'}
      >
        How to Play Planning Poker
      </Text>
      <List.Root
        gap={2}
        variant="plain"
        align="center"
        width={'80%'}
        fontSize={'md'}
        md={{
          fontSize: 'lg',
        }}
        lg={{
          fontSize: 'xl',
        }}
        fontWeight={'light'}
        color={'white'}
      >
        {/* Gather Your Team */}
        <List.Item gap={2} alignItems={'start'}>
          <List.Indicator asChild color="green.500">
            <MdOutlineSubdirectoryArrowRight />
          </List.Indicator>
          <Stack gap={0}>
            <Text fontWeight={'bold'}>Gather Your Team</Text>
            <Text>
              Invite your team members to join a Planning Poker session.
            </Text>
          </Stack>
        </List.Item>
        {/* Choose a Story or Task */}
        <List.Item gap={2} alignItems={'start'}>
          <List.Indicator asChild color="green.500">
            <MdOutlineSubdirectoryArrowRight />
          </List.Indicator>
          <Stack gap={0}>
            <Text fontWeight={'bold'}>Choose a Story or Task</Text>
            <Text>
              The facilitator (often the Scrum Master) presents a user story,
              bug, or task that needs estimation.{' '}
            </Text>
          </Stack>
        </List.Item>
        {/* Discuss Briefly */}
        <List.Item gap={2} alignItems={'start'}>
          <List.Indicator asChild color="green.500">
            <MdOutlineSubdirectoryArrowRight />
          </List.Indicator>
          <Stack gap={0}>
            <Text fontWeight={'bold'}>Discuss Briefly</Text>
            <Text>
              The team discusses the task to clarify any details, but keeps it
              short to avoid deep dives.
            </Text>
          </Stack>
        </List.Item>
        {/* Vote! */}
        <List.Item gap={2} alignItems={'start'}>
          <List.Indicator asChild color="green.500">
            <MdOutlineSubdirectoryArrowRight />
          </List.Indicator>
          <Stack gap={0}>
            <Text fontWeight={'bold'}>Vote!</Text>
            <Text>
              Each member selects a card representing their estimate. Cards
              usually have numbers from the Fibonacci sequence (1, 2, 3, 5, 8,
              13, etc.).
            </Text>
          </Stack>
        </List.Item>
        {/* Reveal Cards Simultaneously */}
        <List.Item gap={2} alignItems={'start'}>
          <List.Indicator asChild color="green.500">
            <MdOutlineSubdirectoryArrowRight />
          </List.Indicator>
          <Stack gap={0}>
            <Text fontWeight={'bold'}>Reveal Cards Simultaneously</Text>
            <Text>
              Everyone shows their selected card at the same time to prevent
              bias.
            </Text>
          </Stack>
        </List.Item>
        {/* Discuss Differences */}
        <List.Item gap={2} alignItems={'start'}>
          <List.Indicator asChild color="green.500">
            <MdOutlineSubdirectoryArrowRight />
          </List.Indicator>
          <Stack gap={0}>
            <Text fontWeight={'bold'}>Discuss Differences</Text>
            <Text>
              If there are wide differences in votes, team members discuss why
              they chose their estimates.
            </Text>
          </Stack>
        </List.Item>
        {/* Revote if Needed */}
        <List.Item gap={2} alignItems={'start'}>
          <List.Indicator asChild color="green.500">
            <MdOutlineSubdirectoryArrowRight />
          </List.Indicator>
          <Stack gap={0}>
            <Text fontWeight={'bold'}>Revote if Needed</Text>
            <Text>
              After discussion, the team may vote again until they reach a
              consensus.
            </Text>
          </Stack>
        </List.Item>
      </List.Root>
    </Stack>
  );
};
