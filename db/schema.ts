import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

// تعریف تایپ‌ها بر اساس اسکیما برای Type Safety بهتر
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
