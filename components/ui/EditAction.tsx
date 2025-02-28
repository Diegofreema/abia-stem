'use client';
import { colors } from '@/constants';
import { IconButton } from '@chakra-ui/react';
import { IconEdit } from '@tabler/icons-react';

type Props = {
  onClick: () => void;
};

export const EditAction = ({ onClick }: Props): JSX.Element => {
  return (
    <div className="flex justify-end">
      <IconButton onClick={onClick}>
        <IconEdit color={colors.textGrey} />
      </IconButton>
    </div>
  );
};
