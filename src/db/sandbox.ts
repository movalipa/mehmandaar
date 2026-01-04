// test area for database intractions using drizzle
// this file wont be included in production and it is meant for development only
// run by `pnpm db:sandbox`

import { db } from "@/db"
import { staff } from "./schema"

async function main() {
  await db.insert(staff).values({
    firstName: "Aref",
    lastName: "Jesus",
    phone: "09123456789",
  })
  console.log("New user created!")

  const usersRes = await db.select().from(staff)
  console.log("Getting all users from the database: ", usersRes)
}

main()
