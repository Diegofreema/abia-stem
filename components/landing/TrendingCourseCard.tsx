import { colors } from '@/constants';
import { trendingCoursesArray } from '@/dummy_data';
import { Box, Card, IconButton, Image, Separator } from '@chakra-ui/react';
import {
  IconBookmark,
  IconCalendar,
  IconClock,
  IconStarFilled,
} from '@tabler/icons-react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText } from '../typography/Title';
import { Avatar } from '../ui/avatar';

type Props = {
  course: (typeof trendingCoursesArray)[number];
};

export const TrendingCourseCard = ({ course }: Props): JSX.Element => {
  return (
    <Card.Root
      overflow={'hidden'}
      maxW={'sm'}
      backgroundColor={'white'}
      boxShadow={'sm'}
    >
      <Image src={course.img} alt={course.title} />
      <Card.Body>
        <FlexWrapper
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <FlexWrapper gap={2} height={'fit-content'} alignItems={'center'}>
            <Box
              backgroundColor={colors.skyBlue}
              px={2}
              py={0.5}
              borderRadius={6}
            >
              <NormalText color={colors.blue} fontSize={'xs'}>
                {course.category}
              </NormalText>
            </Box>
            <Box
              backgroundColor={colors.black}
              px={2}
              py={0.5}
              borderRadius={6}
            >
              <NormalText fontSize={'xs'} color={colors.white}>
                {course.level}
              </NormalText>
            </Box>
          </FlexWrapper>
          <IconButton>
            <IconBookmark color="black" />
          </IconButton>
        </FlexWrapper>
        <Card.Title color={colors.black} fontSize={'2xl'} fontWeight={'bold'}>
          {course.title}
        </Card.Title>
        <FlexWrapper
          mt={3}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <FlexWrapper gap={2} alignItems={'center'}>
            <NormalText color={colors.yellow}>{course.rating}</NormalText>
            <IconStarFilled color={colors.yellow} size={15} />
            <NormalText>({course.numberOfRates})</NormalText>
          </FlexWrapper>
          <FlexWrapper>
            <NormalText>{course.numberOfStudents} (Students)</NormalText>
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper gap={2} mt={3} alignItems={'center'} width={'100%'}>
          <FlexWrapper alignItems={'center'} gap={1}>
            <IconClock color={colors.red} />
            <NormalText>{course.duration}</NormalText>
          </FlexWrapper>
          <FlexWrapper alignItems={'center'} gap={1}>
            <IconCalendar color={colors.orange} />
            <NormalText>{course.numberOfLectures} lectures</NormalText>
          </FlexWrapper>
        </FlexWrapper>
      </Card.Body>
      <Separator />
      <Card.Footer
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <FlexWrapper gap={2} alignItems={'center'}>
          <Avatar src={course.authorImage} />
          <NormalText color={colors.black} fontSize={'md'}>
            {course.author}
          </NormalText>
        </FlexWrapper>
        <NormalText color={colors.green} fontSize={'xl'} fontWeight={'bold'}>
          ₦{course.price}
        </NormalText>
      </Card.Footer>
    </Card.Root>
  );
};
