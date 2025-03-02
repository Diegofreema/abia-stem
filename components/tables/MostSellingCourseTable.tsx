'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { colors } from '@/constants';
import { api } from '@/convex/_generated/api';
import formatTimeDuration from '@/lib/utils';
import { For, Image, Separator, Stack } from '@chakra-ui/react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { Title } from '../typography/Title';
import { Button } from '../ui/button';

const head = ['Course name', 'Selling', 'Amount', 'Period', 'Action'];
export const MostSellingCourseTable = (): JSX.Element | null => {
  const { userId } = useAuth();
  const courses = useQuery(api.courses.getCourses, { clerkId: userId! });

  const data = courses?.map((item) => ({
    image: item.imageUrl,
    title: item.title,
    selling: item.salesCount,
    amount: (item.salesCount || 0) * (item.price || 0),
    period: item._creationTime,
    courseId: item._id,
  }));
  if (courses === undefined || data?.length === 0) return null;
  return (
    <Stack border={'1px solid #ccc'} p={5} mt={16} borderRadius={5}>
      <FlexWrapper justifyContent={'space-between'} alignItems={'center'}>
        <Title color={colors.black} fontSize={'2xl'}>
          Most Selling Courses
        </Title>
        <Button
          p={3}
          color={colors.blue}
          backgroundColor={colors.skyBlue}
          _hover={{ backgroundColor: colors.blue, color: colors.skyBlue }}
          className="transition"
        >
          View all
        </Button>
      </FlexWrapper>
      <Separator backgroundColor={'#ccc'} />
      <Table>
        <TableHeader className="bg-black p-2 rounded-md">
          <TableRow>
            {head.map((item, index) => (
              <TableHead key={index} className=" text-white font-bold">
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <For each={data}>
            {(item, index) => (
              <TableRow key={index}>
                <TableCell key={index} className="font-bold">
                  <FlexWrapper>
                    <Image
                      alt="image"
                      src={item.image}
                      width={50}
                      height={50}
                      borderRadius={5}
                    />
                    {item.title}
                  </FlexWrapper>
                </TableCell>
                <TableCell>{item.selling}</TableCell>
                <TableCell>₦{item.amount}</TableCell>
                <TableCell>{formatTimeDuration(item.period)}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </Stack>
  );
};
