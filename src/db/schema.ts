import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  phone: varchar({ length: 16 }).notNull().unique(),
})

// تعریف تایپ‌ها بر اساس اسکیما برای Type Safety بهتر
export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert

export const phoneOtpsTable = pgTable(
  "phone_otps",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    phone: varchar({ length: 16 }).notNull(),
    code: varchar({ length: 6 }).notNull(),
    expiresAt: timestamp({
      mode: "date",
      withTimezone: true,
    }).notNull(),
    verifiedAt: timestamp({ mode: "date", withTimezone: true }),
  },
  table => {
    return [index("phone_otps_phone_idx").on(table.phone)]
  }
)
