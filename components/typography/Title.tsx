'use client';
import { colors } from '@/constants';
import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

type TitleProps = HeadingProps & {};
type Props = TextProps & {
  color?: string;
};

export const Title = ({
  fontSize = { base: '3xl', md: '5xl' },
  ...props
}: TitleProps): JSX.Element => {
  return (
    <Heading
      {...props}
      fontFamily={'heading'}
      fontSize={fontSize}
      fontWeight={600}
    />
  );
};

export const NormalText = ({
  color = colors.textGrey,
  ...props
}: Props): JSX.Element => {
  return <Text {...props} color={color} fontFamily={'serif'} />;
};
