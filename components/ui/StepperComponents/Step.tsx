import { colors } from '@/constants';
import { Circle, Stack } from '@chakra-ui/react';
import { FlexWrapper } from '../../custom-components/FlexWrapper';
import { NormalText } from '../../typography/Title';
import { useStep } from '@/hooks/useSteps';

type Props = {
  isActive: boolean;
  title: string;
  value: number;
};

export const Step = ({ isActive, title, value }: Props): JSX.Element => {
  const [, setStep] = useStep();
  const onClick = async () => {
    await setStep({
      step: value - 1,
      title: title,
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
          onClick={onClick}
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
          hideBelow={'md'}
        >
          {title}
        </NormalText>
      </Stack>
    </FlexWrapper>
  );
};
