/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  IconBasket,
  IconCash,
  IconEdit,
  IconLayoutDashboardFilled,
  IconMoneybag,
  IconSettings,
  IconStar,
  IconTrash,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { IRoutes } from '@/types';
import { Link } from 'next-view-transitions';

const Icon = {
  IconLayoutDashboardFilled,
  IconBasket,
  IconUsers,
  IconMoneybag,
  IconCash,
  IconStar,
  IconTrash,
  IconWallet,
  IconSettings,
  IconEdit,
};
type Props = {
  route: IRoutes;
  isActive: boolean;
};

export const NavigatorLink = ({
  route: { icon, label, path },
  isActive,
}: Props): JSX.Element => {
  // @ts-expect-error
  const SelectedIcon = Icon[icon];

  return (
    <Link
      href={path}
      className={cn(
        'flex items-center gap-2 group hover:bg-white p-2 rounded-sm transition duration-300 ease-in-out hover:text-black',
        isActive && 'bg-white text-black'
      )}
    >
      <SelectedIcon size={20} />
      {label}
    </Link>
  );
};
