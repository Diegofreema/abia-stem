import { IRoutes } from '@/types';
import { For, Stack } from '@chakra-ui/react';
import { NavigatorLink } from './NavigatorLink';
import { colors } from '@/constants';

type Props = {
  routes: IRoutes[];
};

export const SideNav = ({ routes }: Props): JSX.Element => {
  return (
    <Stack gap={4} backgroundColor={colors.dark} p={5} borderRadius={5}>
      <For each={routes}>
        {(route, index) => <NavigatorLink route={route} key={index} />}
      </For>
    </Stack>
  );
};
