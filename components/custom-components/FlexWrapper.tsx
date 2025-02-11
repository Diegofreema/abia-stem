'use client';

import { Flex, FlexProps } from '@chakra-ui/react';

type Props = FlexProps & {};

export const FlexWrapper = ({ ...props }: Props): JSX.Element => {
  return <Flex {...props} />;
};
