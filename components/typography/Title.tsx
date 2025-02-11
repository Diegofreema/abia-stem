'use client';
import { Text, TextProps } from '@chakra-ui/react';

type Props = TextProps & {};

export const Title = ({ ...props }: Props): JSX.Element => {
  return <Text {...props} />;
};
