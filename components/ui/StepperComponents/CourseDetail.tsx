'use client';
import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { colors } from '@/constants';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { levels } from '@/dummy_data';
import { useCourseId } from '@/hooks/useCourseId';
import { useStep } from '@/hooks/useSteps';
import { courseDetailsValidator } from '@/lib/validator';
import { CourseType, TitleProps } from '@/types';
import { IconButton, SimpleGrid, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconEdit } from '@tabler/icons-react';
import { useMutation, useQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../button';
import { ValidatorField } from '../CustomInput';
import { ValidatorFieldSwitch } from '../CustomSwitch';
import { RichTextEditor } from '../RichTextEditor';
import { toaster } from '../toaster';
import { StepperTitle } from './StepperTitle';
import { LoadingSpinner } from '@/components/universal/LoadingSpinner';
import { EditAction } from '../EditAction';
export const CourseDetail = ({ title, loggedInUserId, course }: TitleProps) => {
  return (
    <Stack>
      <StepperTitle title={title} />
      <CourseDetailForm loggedInUserId={loggedInUserId} course={course} />
    </Stack>
  );
};

const CourseDetailForm = ({
  loggedInUserId,
  course,
}: {
  loggedInUserId: Id<'users'>;
  course: CourseType;
}) => {
  const data = useQuery(api.courses.getCategory);
  const createCourse = useMutation(api.courses.createCourse);
  const editCourse = useMutation(api.courses.editCourse);
  const getCourseId = useCourseId((state) => state.setCourseId);
  const courseId = useCourseId((state) => state.courseId);

  const [, setStep] = useStep();

  const [disable, setDisable] = useState(false);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = useForm<z.infer<typeof courseDetailsValidator>>({
    defaultValues: {
      title: '',
      description: 'Information technology',
      category: '',
      courseLevel: 'all levels',
      isPaid: false,
      price: '',
    },
    resolver: zodResolver(courseDetailsValidator),
  });

  useEffect(() => {
    if (course) {
      setDisable(true);
      const fieldsToPopulate: {
        key: keyof z.infer<typeof courseDetailsValidator>;
        value: string | boolean;
      }[] = [
        { key: 'title', value: course?.course.title! },
        { key: 'description', value: course?.course.description! },
        { key: 'category', value: course?.course?.category?.toLowerCase()! },
        { key: 'courseLevel', value: course?.course.courseLevel! },
        { key: 'isPaid', value: course?.course.isPaid! },
        { key: 'price', value: course?.course?.price?.toString()! },
      ];
      fieldsToPopulate.map((item) => setValue(item.key, item.value));
    }
  }, [course, setValue]);

  if (data === undefined) return <LoadingSpinner />;
  const createdCourse = !!course.course;
  const buttonText = createdCourse ? 'Edit' : 'Create';

  const { courseLevel, category } = watch();

  const onSubmit = async (data: z.infer<typeof courseDetailsValidator>) => {
    const descriptionText = course
      ? 'Course edited'
      : 'Complete the next steps to finish creating your course';
    const errorText = course ? 'editing' : 'creating';
    try {
      if (course && courseId) {
        await editCourse({
          category: data.category,
          courseLevel: data.courseLevel,
          description: data.description,
          isPaid: data.isPaid,
          price: Number(data.price),
          title: data.title,
          courseId,
        });
      } else if (!course) {
        const id = await createCourse({
          category: data.category,
          courseLevel: data.courseLevel,
          description: data.description,
          instructorId: loggedInUserId,
          isPaid: data.isPaid,
          price: Number(data.price),
          title: data.title,
        });
        getCourseId(id);
      }

      toaster.create({
        title: 'Success',
        description: descriptionText,
        type: 'success',
      });

      await setStep({
        step: 1,
        title: 'Course media',
      });
    } catch (error) {
      console.log(error);
      toaster.create({
        title: 'Error',
        description: `An error occurred while ${errorText} course`,
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
      {course && <EditAction onClick={() => setDisable(false)} />}
      <ValidatorField
        control={control}
        name="title"
        errors={errors}
        label="Course title"
        placeholder="Enter course title"
        disabled={disable}
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
          disabled={disable}
          defaultValue={category}
        />
        <ValidatorField
          control={control}
          name="price"
          errors={errors}
          label="Course Price (Naira)"
          placeholder="Add a price in naira"
          type="number"
          disabled={disable}
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
          disabled={disable}
          defaultValue={courseLevel}
        />

        <ValidatorFieldSwitch
          control={control}
          name="isPaid"
          errors={errors}
          label="Check if you want this to be a paid course"
          disabled={disable}
        />
      </SimpleGrid>
      <RichTextEditor
        control={control}
        name="description"
        errors={errors}
        label="Course description"
        placeholder="Describe your course..."
        disabled={disable}
      />
      <FlexWrapper justify="flex-end">
        <Button
          loading={isSubmitting}
          disabled={isSubmitting || disable}
          loadingText="Creating course.."
          p={4}
          color={colors.white}
          bg={colors.blue}
          _hover={{ bg: colors.skyBlue }}
          onClick={handleSubmit(onSubmit)}
        >
          {buttonText}
        </Button>
      </FlexWrapper>
    </Stack>
  );
};
