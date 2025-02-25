'use client';
import Orb from '@/components/custom-components/Orbs';
import { api } from '@/convex/_generated/api';
import { levels } from '@/dummy_data';
import { courseDetailsValidator } from '@/lib/validator';
import { TitleProps } from '@/types';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ValidatorField } from '../CustomInput';
import { ValidatorFieldSwitch } from '../CustomSwitch';
import { StepperTitle } from './StepperTitle';
import { RichTextEditor } from '../RichTextEditor';
import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { Button } from '../button';
import { colors } from '@/constants';
import { toaster } from '../toaster';
import { Id } from '@/convex/_generated/dataModel';
import { useCourseId } from '@/hooks/useCourseId';
import { useStep } from '@/hooks/useSteps';
export const CourseDetail = ({
  title,
  loggedInUserId,
}: TitleProps): JSX.Element => {
  return (
    <Stack>
      <StepperTitle title={title} />
      <CourseDetailForm loggedInUserId={loggedInUserId} />
    </Stack>
  );
};

const CourseDetailForm = ({
  loggedInUserId,
}: {
  loggedInUserId: Id<'users'>;
}) => {
  const data = useQuery(api.courses.getCategory);
  const createCourse = useMutation(api.courses.createCourse);
  const getCourseId = useCourseId((state) => state.setCourseId);
  const [, setStep] = useStep();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<z.infer<typeof courseDetailsValidator>>({
    defaultValues: {
      title: '',
      description: '',
      category: data?.[0].name.toLowerCase() || '',
      courseLevel: 'all levels',
      isPaid: false,
      price: '',
    },
    resolver: zodResolver(courseDetailsValidator),
  });
  if (data === undefined) return <Orb />;

  const onSubmit = async (data: z.infer<typeof courseDetailsValidator>) => {
    try {
      const courseId = await createCourse({
        category: data.category,
        courseLevel: data.courseLevel,
        description: data.description,
        instructorId: loggedInUserId,
        isPaid: data.isPaid,
        price: Number(data.price),
        title: data.title,
      });
      toaster.create({
        title: 'Success',
        description: 'Complete the next steps to finish creating your course',
        type: 'success',
      });
      getCourseId(courseId);
      await setStep({
        step: 1,
        title: 'Course media',
      });
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'An error occurred while creating course',
        type: 'error',
      });
    }
  };
  const cat = data?.map((item) => ({
    label: item.name,
    value: item.name.toLowerCase(),
  }));
  return (
    <Stack gap={5}>
      <ValidatorField
        control={control}
        name="title"
        errors={errors}
        label="Course title"
        placeholder="Enter course title"
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <ValidatorField
          control={control}
          name="category"
          errors={errors}
          label="Course Category"
          placeholder="Select category"
          mode="select"
          collections={cat}
        />
        <ValidatorField
          control={control}
          name="price"
          errors={errors}
          label="Course Price"
          placeholder="Add a price in naira"
          type="number"
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={4}
        placeContent={'center'}
        placeItems={'center'}
      >
        <ValidatorField
          control={control}
          name="courseLevel"
          errors={errors}
          label="Course level"
          placeholder="Select category"
          mode="select"
          collections={levels}
        />

        <ValidatorFieldSwitch
          control={control}
          name="isPaid"
          errors={errors}
          label="Check if you want this to be a paid course"
        />
      </SimpleGrid>
      <RichTextEditor
        control={control}
        name="description"
        errors={errors}
        label="Course description"
        placeholder="Describe your course..."
      />
      <FlexWrapper justify="flex-end">
        <Button
          loading={isSubmitting}
          disabled={isSubmitting}
          loadingText="Creating course.."
          p={4}
          color={colors.white}
          bg={colors.blue}
          _hover={{ bg: colors.skyBlue }}
          onClick={handleSubmit(onSubmit)}
        >
          Create
        </Button>
      </FlexWrapper>
    </Stack>
  );
};
