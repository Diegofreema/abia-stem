import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { colors } from '@/constants';
import { Button } from '../button';

type Props = {
  onClick: () => void;
  disable?: boolean;
  text?: string;
  loading?: boolean;
};

export const NextPreviousBtn = ({
  disable,
  text = 'Next',
  onClick,
  loading,
}: Props): JSX.Element => {
  return (
    <FlexWrapper justify={'flex-end'}>
      <Button
        bg={colors.blue}
        disabled={disable}
        loading={loading}
        px={3}
        color={colors.white}
        width={'fit-content'}
        onClick={onClick}
        className="transition cursor-pointer"
        _hover={{
          bg: colors.skyBlue,
        }}
      >
        {text}
      </Button>
    </FlexWrapper>
  );
};
