import { auth } from './auth'; // path to your Better Auth server instance
import { headers } from 'next/headers';

export const session = await auth.api.getSession({
  headers: headers(), // you need to pass the headers object.
});
