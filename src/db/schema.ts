import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  phone: varchar("phone", { length: 16 }).notNull().unique(),
})

// تعریف تایپ‌ها بر اساس اسکیما برای Type Safety بهتر
export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert

export const phoneOtpsTable = pgTable(
  "phone_otps",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    phone: varchar("phone", { length: 16 }).notNull(),
    code: varchar("code", { length: 6 }).notNull(),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
    verifiedAt: timestamp("verified_at", { mode: "date", withTimezone: true }),
  },
  table => {
    return [index("phone_otps_phone_idx").on(table.phone)]
  }
)
