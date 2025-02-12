import { colors } from '@/constants';
import { useSelectCourses } from '@/hooks/useSelectCourses';
import { Box, For } from '@chakra-ui/react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText } from '../typography/Title';

const courses = [
  'Web Design',
  'Development',
  'Graphic Design',
  'Marketing',
  'Finance',
];
export const CoursesSwitcher = (): JSX.Element => {
  const [selectedCourse, setSelectedCourse] = useSelectCourses();

  return (
    <FlexWrapper
      gap={10}
      width={'100%'}
      justifyContent={'center'}
      bg={colors.skyBlue}
      py={3}
      borderRadius={8}
    >
      <For each={courses}>
        {(course, index) => (
          <Box
            key={index}
            p={2}
            px={5}
            bg={selectedCourse === course ? colors.blue : 'transparent'}
            borderRadius={5}
          >
            <NormalText
              fontSize={'lg'}
              fontWeight={500}
              onClick={() => setSelectedCourse(course)}
              cursor={'pointer'}
              color={selectedCourse === course ? colors.white : colors.blue}
            >
              {course}
            </NormalText>
          </Box>
        )}
      </For>
    </FlexWrapper>
  );
};
