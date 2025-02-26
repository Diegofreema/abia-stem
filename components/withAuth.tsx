import { currentUser, User } from "@clerk/nextjs/server";

export interface WithUserDataProps {
  user: User;
}

export function withAuth<P extends WithUserDataProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return async function WithUserDataWrapper(props: P) {
    const user = await currentUser();
    return <WrappedComponent {...props} user={user} />;
  };
}
