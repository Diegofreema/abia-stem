import { Progress } from '@chakra-ui/react';
import { InfoTip } from './toggle-tip';

type Props = {
  value?: number | null;
};

export const ProgressComponent = ({ value = null }: Props): JSX.Element => {
  return (
    <Progress.Root
      maxW="100%"
      shape={'rounded'}
      colorPalette={'green'}
      bg={'white'}
      striped
      animated
      value={value}
    >
      <Progress.Label mb="2" color={'black'}>
        Uploading
        <InfoTip>Uploading document to the server</InfoTip>
      </Progress.Label>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
};
