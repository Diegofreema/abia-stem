import { coursesArray } from '@/dummy_data';
import { Box, Card, CardRoot, IconButton, Image } from '@chakra-ui/react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText } from '../typography/Title';
import { IconHeart, IconStar } from '@tabler/icons-react';
import { colors } from '@/constants';
import { Rating } from '../ui/rating';

type Props = {
  course: (typeof coursesArray)[number];
};

export const CourseCard = ({ course }: Props): JSX.Element => {
  const isLiked = course.id === 1;
  return (
    <Card.Root
      overflow={'hidden'}
      maxW={'sm'}
      backgroundColor={'white'}
      boxShadow={'sm'}
    >
      <Image src={course.img} alt={course.title} />
      <Card.Body gap="2">
        <FlexWrapper justifyContent={'space-between'} alignItems={'center'}>
          <Box backgroundColor={'#EBF8F2'} p={1} borderRadius={5}>
            <NormalText color={'#2DC08E'}>{course.level}</NormalText>
          </Box>
          <IconButton>
            <IconHeart
              size={20}
              stroke={1.5}
              color={isLiked ? 'red' : 'black'}
              fill={isLiked ? 'red' : 'none'}
            />
          </IconButton>
        </FlexWrapper>
        <Card.Title color={colors.black} fontSize={'xl'}>
          {course.title}
        </Card.Title>
        <Card.Description color={colors.textGrey}>
          {course.description}
        </Card.Description>
        <FlexWrapper alignItems={'center'} gap={2}>
          <Rating
            defaultValue={course.rating}
            size="sm"
            readOnly
            colorPalette={'yellow'}
            backgroundColor={'white'}
            allowHalf
            color={colors.white}
          />
          <NormalText color={colors.black}>{course.rating}/5</NormalText>
        </FlexWrapper>
      </Card.Body>
      <Card.Footer gap="2"></Card.Footer>
    </Card.Root>
  );
};
