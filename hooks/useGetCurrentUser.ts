import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';

export const useGetCurrentUser = () => {
  const { isLoaded, user, isSignedIn } = useUser();
  const data = useQuery(api.users.currentUser, { userId: user?.id });
  if (!isLoaded || !isSignedIn) return null;

  return data;
};
