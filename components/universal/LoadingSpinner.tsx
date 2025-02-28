import { colors } from '@/constants';
import { Spinner } from '@chakra-ui/react';
import { IconLoader2 } from '@tabler/icons-react';

export const LoadingSpinner = () => {
  return (
    <div className="min-h-[300px] h-full w-full flex items-center justify-center">
      <IconLoader2 size={50} color={colors.blue} className="animate-spin" />
    </div>
  );
};
