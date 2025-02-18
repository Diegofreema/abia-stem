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
import { IRoutes } from './types';

export const instructorRoutes: IRoutes[] = [
  {
    label: 'Dashboard',
    path: '/instructor/dashboard',
    icon: IconLayoutDashboardFilled,
  },
  {
    label: 'My Courses',
    path: '/instructor/courses',
    icon: IconBasket,
  },
  {
    label: 'Students',
    path: '/instructor/students',
    icon: IconUsers,
  },
  {
    label: 'Earnings',
    path: '/instructor/earnings',
    icon: IconMoneybag,
  },
  {
    label: 'Reviews',
    path: '/instructor/reviews',
    icon: IconStar,
  },
  {
    label: 'Edit Profile',
    path: '/instructor/edit-profile',
    icon: IconEdit,
  },
  {
    label: 'Orders',
    path: '/instructor/orders',
    icon: IconCash,
  },
  {
    label: 'Payments',
    path: '/instructor/payments',
    icon: IconWallet,
  },
  {
    label: 'Settings',
    path: '/instructor/settings',
    icon: IconSettings,
  },
  {
    label: 'Delete Account',
    path: '/instructor/delete-account',
    icon: IconTrash,
  },
];
