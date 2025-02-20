import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@/components/ui/skeleton';
import { HStack } from '@chakra-ui/react';

export const CategorySwitcherSkeleton = () => {
  return (
    <HStack width="150px">
      <Skeleton height={'50px'} width={'50px'} />
      <SkeletonText noOfLines={1} />
    </HStack>
  );
};
export const AccountSwitcherSkeleton = () => {
  return (
    <HStack width="150px">
      <SkeletonText noOfLines={1} />
    </HStack>
  );
};
export const HeaderLeftSkeleton = () => {
  return (
    <HStack width="200px" gap={3}>
      <Skeleton height={40} width={'200px'} />
      <SkeletonCircle size={'10'} />
    </HStack>
  );
};
