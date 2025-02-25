import {colors} from '@/constants';
import {useSelectCourses} from '@/hooks/useSelectCourses';
import {For} from '@chakra-ui/react';
import {FlexWrapper} from '../custom-components/FlexWrapper';
import {NormalText} from '../typography/Title';
import {courses} from '@/dummy_data';

export const CoursesSwitcher = (): JSX.Element => {
  const [selectedCourse, setSelectedCourse] = useSelectCourses();

  return (
    <FlexWrapper
      gap={{base: 5, md: 10}}
      width={'100%'}
      justifyContent={{base: 'flex-start',md: 'center'}}
      bg={colors.skyBlue}
      py={3}
      borderRadius={8}
      flexWrap={'wrap'}
      px={1}
    >
      <For each={courses}>
        {(course, index) => (
          <FlexWrapper
            key={index}
            py={2}
            px={4}
            bg={selectedCourse === course ? colors.blue : 'transparent'}
            borderRadius={5}

          >
            <NormalText
              fontSize={{base: 'md', md: 'lg'}}
              fontWeight={500}
              onClick={() => setSelectedCourse(course)}
              cursor={'pointer'}
              color={selectedCourse === course ? colors.white : colors.blue}
            >
              {course}
            </NormalText>
          </FlexWrapper>
        )}
      </For>
    </FlexWrapper>
  );
};
