import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';

type Props = ButtonProps & {};

export const Button = ({ ...props }: Props): JSX.Element => {
  return <ChakraButton {...props} />;
};
