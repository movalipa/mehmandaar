// test area for database intractions using drizzle
// this file wont be included in production and it is meant for development only
// run by `pnpm db:sandbox`

import { db, users } from "@/db"

async function main() {
  console.warn("START")

  console.time("a")

  await db.insert(users).values({
    firstName: "Aref",
    lastName: "Jesus",
    phone: "09123456789",
    organizationId: "1",
  })
  console.log("New user created!")

  const usersRes = await db.select().from(users)
  console.log("Getting all users from the database: ", usersRes)

  console.timeEnd("a")
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

  console.warn("END")
}

main()
