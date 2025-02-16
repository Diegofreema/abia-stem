import {
  ConditionalValue,
  SimpleGrid,
  SimpleGridProps,
} from '@chakra-ui/react';

type Props = SimpleGridProps & {
  md?: ConditionalValue<number>;
  base?: ConditionalValue<number>;
  gap?: boolean;
};

export const GridWrapper = ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  md = 2,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  base = 1,
  gap = true,
  ...props
}: Props): JSX.Element => {
  const hasGap = gap ? { base: 10, md: 15 } : 0;
  return <SimpleGrid {...props} columns={{ base, md }} gap={hasGap} />;
};
