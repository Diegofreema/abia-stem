import { Stack } from '@chakra-ui/react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText, Title } from '../typography/Title';
import { colors } from '@/constants';
import { Button } from '../ui/button';

export const BecomeInstructorBanner = () => {
  return (
    <FlexWrapper
      alignItems={'center'}
      justifyContent={'space-between'}
      width={'100%'}
      borderRadius={9}
      flexDirection={{base: 'column', md: 'row'}}
      gap={{base: 5, md: 0}}
      backgroundColor={'#16A2B8'}
      p={10}
      mt={20}
    >
      <Stack gap={3}>
        <Title color={colors.white} fontSize={'2xl'}>
          Become an Instructor!
        </Title>
        <NormalText
          color={colors.white}
          fontSize={'lg'}
          maxW={{ base: '100%', md: '70%' }}
        >
          Speedily say has suitable disposal add boy. On forth doubt miles of
          child. Exercise joy man children rejoiced. Yet uncommonly his ten who
          diminution astonished.
        </NormalText>
      </Stack>
      <Button
        backgroundColor={'transparent'}
        color={colors.yellow}
        borderWidth={1}
        borderStyle={'solid'}
        borderColor={colors.yellow}
        p={6}
        _hover={{
          backgroundColor: colors.yellow,
          color: colors.black,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        Start Teaching Today
      </Button>
    </FlexWrapper>
  );
};
