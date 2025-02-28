import { Badge } from '@chakra-ui/react';
import { Icon } from '@tabler/icons-react';

type Props = {
  text: string;
  icon: Icon;
  colorPalette:
    | 'border'
    | 'bg'
    | 'current'
    | 'transparent'
    | 'black'
    | 'white'
    | 'whiteAlpha'
    | 'blackAlpha'
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink'
    | 'fg';
};

export const BadgeWithIcon = ({
  colorPalette,
  icon: Icon,
  text,
}: Props): JSX.Element => {
  return (
    <Badge colorPalette={colorPalette} width={'fit-content'}>
      <Icon />
      {text}
    </Badge>
  );
};
