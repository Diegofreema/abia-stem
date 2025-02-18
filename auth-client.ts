import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  fetchOptions: {
    async onSuccess(context) {
      console.log(process.env.DEPLOYMENT_URL);
      const { id, name, image, email } = await context.response.json();
      // const url = process.env.DEPLOYMENT_URL!;
      const data = {
        id,
        name,
        image,
        email,
      };
      console.log(data, 'authClient');

      // fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log('Success:', data);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
    },
  },
});

export const signIn = async (pathname: string) => {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: pathname,
  });
};

export const onSignOut = async () => {
  await authClient.signOut();
};
