import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient();

export const signIn = async (pathname: string) => {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: pathname,
  });
};

export const onSignOut = async () => {
  console.log('pressed');

  const data = await authClient.signOut();
  console.log(data);
};
