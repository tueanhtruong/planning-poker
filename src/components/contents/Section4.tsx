import { Flex, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export const Section4 = () => {
  {
    /* Section 4 */
  }
  return (
    <Stack
      backgroundColor={'var(--contentCardBg)'}
      paddingBlock={4}
      paddingInline={8}
      gapY={6}
      lg={{ paddingBlock: 16, paddingInline: 32 }}
      md={{ paddingBlock: 8, paddingInline: 16 }}
      alignItems={'end'}
      textAlign={'end'}
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
        Boost Productivity with Our Innovation
      </Text>
      <Text
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
        At Plan Poker, we are committed to revolutionizing your project planning
        process with precision and efficiency. Based in Vietnam, our team
        leverages cutting-edge technology and agile methodologies to deliver an
        intuitive, user-friendly Planning Poker platform that enhances
        collaboration and decision-making. By choosing us, you benefit from a
        streamlined planning experience tailored to drive productivity and
        innovation within your teams. Trust in Plan Poker to transform complex
        project challenges into manageable and successful outcomes.
      </Text>
      <Flex
        marginBlockStart={8}
        gap={24}
        // alignItems={'center'}
        alignSelf={'stretch'}
        justifyContent={'space-between'}
      >
        <Flex gap={4} alignItems={'center'}>
          <Image
            src={'/static/logo.webp'}
            alt={'Logo'}
            width={50}
            height={50}
          />
          <Text
            fontSize={'md'}
            md={{ fontSize: 'xl' }}
            lg={{ fontSize: '2xl' }}
            fontWeight={'bold'}
            color={'white'}
          >
            Planning Poker
          </Text>
        </Flex>
        <Text
          fontSize={'md'}
          md={{ fontSize: 'xl' }}
          lg={{ fontSize: '2xl' }}
          fontWeight={'light'}
          color={'white'}
        >
          Made by Me
        </Text>
      </Flex>
    </Stack>
  );
};
