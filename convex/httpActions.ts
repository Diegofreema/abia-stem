// import { httpAction } from './_generated/server';
// import { api } from './_generated/api';
// export const addUser = httpAction(async (ctx, request) => {
//   const { name, email, image, id } = await request.json();
//   await ctx.runMutation(api.users.addUserToDb, {
//     email,
//     name,
//     image,
//     userId: id,
//   });
//   // implementation will be here
//   return new Response(null, {
//     status: 200,
//   });
// });
// //
