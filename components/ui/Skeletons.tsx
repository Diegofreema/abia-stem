import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@/components/ui/skeleton';
import { HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { FlexWrapper } from '../custom-components/FlexWrapper';

export const CategorySwitcherSkeleton = () => {
  return (
    <HStack width="150px">
      <Skeleton height={'30px'} width={'50px'} />
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
    <HStack width="200px" gap={3} mr={5}>
      <Skeleton height={'40px'} width={'200px'} />
      <SkeletonCircle size={'10'} />
    </HStack>
  );
};
export const DataCardSkeleton = () => {
  return (
    <SimpleGrid
      alignItems={'center'}
      columns={{ base: 1, md: 2, lg: 3 }}
      gap={5}
    >
      <Skeleton height={'200px'} width={'100%'} />
    </SimpleGrid>
  );
};
export const SidebarSkeleton = () => {
  return (
    <Skeleton minHeight={600} width={'30%'} gap={5} flexBasis={'30%'}>
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
      <SkeletonText noOfLines={1} />
    </Skeleton>
  );
};

export const BannerSkeleton = () => {
  return <Skeleton height={200} width={'100%'} />;
};

export const ProfilePreviewSkeleton = () => {
  return (
    <FlexWrapper
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <FlexWrapper gap={5} alignItems={'center'}>
        <SkeletonCircle size={150} width={150} height={150} mt={-10} />
        <Stack>
          <SkeletonText noOfLines={1} />

          <FlexWrapper gap={4} alignItems={'center'}>
            <FlexWrapper>
              <SkeletonCircle size={20} width={20} height={20} />
              <SkeletonText noOfLines={1} />
            </FlexWrapper>
            <FlexWrapper>
              <SkeletonCircle size={20} width={20} height={20} />
              <SkeletonText noOfLines={1} />
            </FlexWrapper>
            <FlexWrapper>
              <SkeletonCircle size={20} width={20} height={20} />
              <SkeletonText noOfLines={1} />
            </FlexWrapper>
          </FlexWrapper>
        </Stack>
      </FlexWrapper>
      <Skeleton height={50} width={150} />
    </FlexWrapper>
  );
};
