import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export interface WithUserDataProps {
  user: User;
}

export function withAuth<P extends WithUserDataProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return async function WithUserDataWrapper(
    props: Omit<P, keyof WithUserDataProps>
  ) {
    const user = await currentUser();
    if (!user) {
      return redirect('/auth/sign-in');
    }
    return <WrappedComponent {...(props as P)} user={user} />;
  };
}
