import { colors } from '@/constants';
import { Box, Stack } from '@chakra-ui/react';
import { StackCards } from '../custom-components/StackCard';
import { NormalText, Title } from '../typography/Title';
import { Button } from '../ui/button';
import { GridWrapper } from '../custom-components/GridWrapper';
import { FlexWrapper } from '../custom-components/FlexWrapper';

export const Feedback = () => {
  return (
    <Box>
      <GridWrapper placeItems={'center'} placeContent={'center'}>
        <Stack gap={5} mb={{base: 0, md: 20}}>
          <Title
            color={colors.black}
            fontWeight={700}
            fontSize={{ base: '3xl', md: '5xl' }}
            lineHeight={1.2}
          >
            Some valuable feedback from our students
          </Title>
          <NormalText
            color={colors.textGrey}
            fontSize={{ base: 'md', md: 'xl' }}
          >
            Supposing so be resolving breakfast am or perfectly. It drew a hill
            from me. Valley by oh twenty direct me so. Departure defective
            arranging rapturous did believe him all had supported. Family months
            lasted simple set nature vulgar him. Picture for attempt joy excited
            ten carried manners talking how.
          </NormalText>
          <Button
            backgroundColor={colors.blue}
            color={colors.white}
            width={180}
          >
            View Reviews
          </Button>
        </Stack>
        <FlexWrapper  justifyContent={{md: 'center'}} alignItems={{base: 'flex-start', md: 'center'}}>
          <StackCards />
        </FlexWrapper>
      </GridWrapper>
    </Box>
  );
};
