import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

type Props = SimpleGridProps & {};

export const GridWrapper = ({ ...props }: Props): JSX.Element => {
  return (
    <SimpleGrid
      {...props}
      columns={{ base: 1, md: 2 }}
      gap={{ base: 10, md: 15 }}
    />
  );
};
