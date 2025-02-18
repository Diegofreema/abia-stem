import { Icon } from '@tabler/icons-react';

export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
};

export type IRoutes = {
  path: string;
  label: string;
  icon: Icon;
};
