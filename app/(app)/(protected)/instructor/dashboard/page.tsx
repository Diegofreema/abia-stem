import { session } from '@/server';
import { redirect } from 'next/navigation';

const dashboard = async () => {
  const userSession = session?.session;
  if (!userSession) {
    return redirect('/auth/sign-in');
  }

  console.log(session);

  return <div>dashboard</div>;
};

export default dashboard;
