import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

// =============================
// Organizations
// =============================

export const organizations = pgTable("organizations", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})

export type Organization = typeof organizations.$inferSelect
export type NewOrganization = typeof organizations.$inferInsert

// =============================
// Users
// =============================

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid()
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 16 }).notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

// =============================
// Role
// =============================

export type PermissionKeys = "rooms" | "finance" // ...
export type PermissionValues = "none" | "read" | "write" | undefined
export type Permission = Record<string, PermissionValues>

export const roles = pgTable("roles", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(), // 'owner', 'manager', ...
  permissions: jsonb().$type<Permission>().default({}),
})

export type Role = typeof roles.$inferSelect
export type NewRole = typeof roles.$inferInsert

// =============================
// organization User Roles
// =============================

export const organizationUserRoles = pgTable("organization_user_roles", {
  organizationId: uuid()
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  roleId: integer()
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  assignedAt: timestamp().defaultNow().notNull(),
  // assigned by field might be needed in future
})

export type OrganizationUserRoles = typeof organizationUserRoles.$inferSelect
export type NewOrganizationUserRoles = typeof organizationUserRoles.$inferInsert

// =============================
// Phone Otps
// =============================

export const phoneOtps = pgTable(
  "phone_otps",
  {
    id: serial().primaryKey(),
    phone: varchar({ length: 16 }).notNull(),
    code: varchar({ length: 6 }).notNull(),
    expiresAt: timestamp({
      mode: "date",
      withTimezone: true,
    }).notNull(),
    verifiedAt: timestamp({ mode: "date", withTimezone: true }),
  },
  table => [index("phone_otps_phone_idx").on(table.phone)]
)

export type PhoneOtp = typeof phoneOtps.$inferSelect
export type NewPhoneOtp = typeof phoneOtps.$inferInsert

// =============================
//
// =============================

export const hotels = pgTable("hotels", {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid()
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  name: text().notNull(),
  address: text(),
  createdAt: timestamp().defaultNow().notNull(),
})

export type Hotel = typeof hotels.$inferSelect
export type NewHotel = typeof hotels.$inferInsert

// =============================
// Hotel Roles
// =============================

export const hotelUserRoles = pgTable("hotel_user_roles", {
  hotelId: uuid()
    .notNull()
    .references(() => hotels.id, { onDelete: "cascade" }),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  roleId: integer()
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  assignedAt: timestamp().defaultNow().notNull(),
})

export type HotelUserRole = typeof hotelUserRoles.$inferSelect
export type NewHotelUserRole = typeof hotelUserRoles.$inferInsert

// =============================
// Room Group
// =============================

export const roomGroup = pgTable("room_Group", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  organizationId: uuid().references(() => organizations.id, {
    onDelete: "cascade",
  }),
  hotelId: uuid().references(() => hotels.id, { onDelete: "cascade" }),
  // here both hotelId and organizationId should not be null or both be not null, only one should be set
})

export type FeatureKeys = "wifi" | "finance" // ...
export type FeatureValues = true | false
export type Feature = Record<string, FeatureValues>

export const rooms = pgTable(
  "rooms",
  {
    id: uuid().defaultRandom().primaryKey(),
    hotelId: uuid()
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" }),
    groupId: uuid().references(() => roomGroup.id, {
      onDelete: "set null",
    }),
    name: text().notNull(),
    singleBeds: integer().default(0).notNull(),
    doubleBeds: integer().default(0).notNull(),
  },
  t => [unique().on(t.hotelId, t.name)]
)

export const guests = pgTable("guests", {
  id: uuid().defaultRandom().primaryKey(),
  fullName: text().notNull(),
  phone: varchar({ length: 16 }),
  createdAt: timestamp().defaultNow().notNull(),
  description: text(),
})

export const reservations = pgTable("reservations", {
  id: uuid().defaultRandom().primaryKey(),
  guestId: uuid().references(() => guests.id, { onDelete: "set null" }),
  roomId: uuid().references(() => rooms.id, { onDelete: "set null" }),
  checkIn: timestamp().notNull(),
  checkOut: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  checkedInAt: timestamp(), // actual check in timestamp
  checkedOutAt: timestamp(), // actual check out timestamp
  status: text()
    .$type<"reserved" | "checked-in" | "checked-out" | "cancelled">()
    .default("reserved"),
})
