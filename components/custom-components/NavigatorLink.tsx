import { IRoutes } from '@/types';
import { Link } from 'next-view-transitions';

type Props = {
  route: IRoutes;
};

export const NavigatorLink = ({ route }: Props): JSX.Element => {
  return (
    <Link
      href={route.path}
      className="flex items-center gap-2 group hover:bg-white p-2 rounded-sm transition duration-300 ease-in-out hover:text-black"
    >
      <route.icon size={20} className="group-hover:text-black" />
      {route.label}
    </Link>
  );
};
