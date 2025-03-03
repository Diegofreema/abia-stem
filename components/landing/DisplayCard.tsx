import { Card, CardBody, CardDescription, Stack } from '@chakra-ui/react';
import { Icon } from '@tabler/icons-react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import NumberFormatter from '../custom-components/NumberFormatter';

type Props = {
  icon: Icon;
  title: string | number;
  description: string;
  backgroundColor: string;
  color: string;
};

export const DisplayCard = ({
  description,
  icon: Icon,
  title,
  backgroundColor,
  color,
}: Props): JSX.Element => {
  return (
    <Card.Root
      backgroundColor={backgroundColor}
      flex={1}
      className="hover:-translate-y-4 duration-300 transition-all"
    >
      <CardBody>
        <FlexWrapper gap={5} alignItems={'center'}>
          <Icon size={80} color={color} />
          <Stack gap={2}>
            <Card.Title color={'black'} fontWeight={'bold'} fontSize={'2xl'}>
              {typeof title === 'number' ? (
                <NumberFormatter number={title} big />
              ) : (
                title
              )}
            </Card.Title>
            <CardDescription color={'black'} fontSize={'md'} fontWeight={500}>
              {description}
            </CardDescription>
          </Stack>
        </FlexWrapper>
      </CardBody>
    </Card.Root>
  );
};
