import { colors } from '@/constants';
import { useStep } from '@/hooks/useSteps';
import { Circle, Stack } from '@chakra-ui/react';
import { FlexWrapper } from '../../custom-components/FlexWrapper';
import { NormalText } from '../../typography/Title';

type Props = {
  isActive: boolean;
  title: string;
  value: number;
};

export const Step = ({ isActive, title, value }: Props): JSX.Element => {
  const [, setActiveStep] = useStep();

  const onClick = async (step: number, title: string) => {
    await setActiveStep({
      step,
      title,
    });
  };
  return (
    <FlexWrapper gap={2} alignItems={'center'}>
      <Stack alignItems={'center'} gap={2} position={'relative'}>
        <Circle
          border={`1px solid ${colors.blue}`}
          bg={isActive ? colors.blue : colors.skyBlue}
          color={'white'}
          size={16}
          cursor={'pointer'}
          onClick={() => onClick(value - 1, title)}
        >
          <NormalText
            fontSize={{ base: 20, md: 25 }}
            fontWeight={'bold'}
            color={isActive ? 'white' : colors.blue}
          >
            {value}
          </NormalText>
        </Circle>
        <NormalText
          fontWeight={'bold'}
          color={isActive ? colors.blue : 'black'}
          whiteSpace={'nowrap'}
        >
          {title}
        </NormalText>
      </Stack>
    </FlexWrapper>
  );
};
