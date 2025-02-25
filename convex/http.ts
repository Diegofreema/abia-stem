import { httpRouter } from "convex/server";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();
export const createOrUpdateUserToDb = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();
  const name = `${data.first_name} ${data.last_name}`;
  switch (type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        name: name,
        image: data.image_url,
        numberOfCourses: 0,
        numberOfStudents: 0,
        rating: 0,
      });
      break;
    case "user.updated":
      console.log("user updated");
      break;
  }
  return new Response(null, { status: 200 });
});
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: createOrUpdateUserToDb,
});
export default http;
