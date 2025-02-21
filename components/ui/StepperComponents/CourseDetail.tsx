'use client';
import Orb from '@/components/custom-components/Orbs';
import { api } from '@/convex/_generated/api';
import { levels } from '@/dummy_data';
import { courseDetailsValidator } from '@/lib/validator';
import { TitleProps } from '@/types';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ValidatorField } from '../CustomInput';
import { ValidatorFieldSwitch } from '../CustomSwitch';
import { StepperTitle } from './StepperTitle';
export const CourseDetail = ({ title }: TitleProps): JSX.Element => {
  return (
    <Stack>
      <StepperTitle title={title} />
      <CourseDetailForm />
    </Stack>
  );
};

const CourseDetailForm = () => {
  const data = useQuery(api.courses.getCategory);
  const {
    control,
    formState: { errors, isSubmitting },
    // handleSubmit,
    // watch,
  } = useForm<z.infer<typeof courseDetailsValidator>>({
    defaultValues: {
      title: '',
      description: '',
      category: data?.[0].name.toLowerCase() || '',
      courseLevel: 'all levels',
      isPaid: false,
      isPublished: false,
      price: '',
    },
    resolver: zodResolver(courseDetailsValidator),
  });
  if (data === undefined) return <Orb />;
  //   const onSubmit = (data: z.infer<typeof courseDetailsValidator>) => {
  //     console.log(data);
  //   };
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
          name="courseLevel"
          errors={errors}
          label="Course level"
          placeholder="Select category"
          mode="select"
          collections={levels}
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
          name="price"
          errors={errors}
          label="Course Price"
          placeholder="Add a price in naira"
          type="number"
        />
        <ValidatorFieldSwitch
          control={control}
          name="isPaid"
          errors={errors}
          label="Check if you want this to be a paid course"
        />
      </SimpleGrid>
    </Stack>
  );
};
