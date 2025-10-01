// test area for database intractions using drizzle
// this file wont be included in production and it is meant for development only
// run by `pnpm db:sandbox`

import { db, usersTable } from "@/db";

async function main() {
  console.warn("START");

  console.time("a");

  await db.insert(usersTable).values({
    name: "Aref",
    age: 12,
    email: crypto.randomUUID(),
  });
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  console.timeEnd("a");
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  //   await db
  //     .update(usersTable)
  //     .set({
  //       age: 31,
  //     })
  //     .where(eq(usersTable.email, user.email));
  //   console.log("User info updated!");

  //   await db.delete(usersTable).where(eq(usersTable.email, user.email));
  //   console.log("User deleted!");

  console.warn("END");
}

main();
