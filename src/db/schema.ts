import type { UUID } from "node:crypto"
import {
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
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
  id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Organization = typeof organizations.$inferSelect
export type NewOrganization = typeof organizations.$inferInsert

// =============================
// Users
// =============================

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, {
      onDelete: "cascade",
    })
    .$type<UUID>(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 16 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // 'owner', 'manager', ...
  permissions: jsonb("permissions").$type<Permission>().default({}),
})

export type Role = typeof roles.$inferSelect
export type NewRole = typeof roles.$inferInsert

// =============================
// organization User Roles
// =============================

export const organizationUserRoles = pgTable(
  "organization_user_roles",
  {
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" })
      .$type<UUID>(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .$type<UUID>(),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
    // assigned by field might be needed in future
  },
  t => [primaryKey({ columns: [t.organizationId, t.userId, t.roleId] })]
)

export type OrganizationUserRoles = typeof organizationUserRoles.$inferSelect
export type NewOrganizationUserRoles = typeof organizationUserRoles.$inferInsert

// =============================
// Phone Otps
// =============================

export const phoneOtps = pgTable(
  "phone_otps",
  {
    id: serial("id").primaryKey(),
    phone: varchar("phone", { length: 16 }).notNull(),
    code: varchar("code", { length: 6 }).notNull(),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
    verifiedAt: timestamp("verified_at", { mode: "date", withTimezone: true }),
  },
  t => [index("phone_otps_phone_idx").on(t.phone)]
)

export type PhoneOtp = typeof phoneOtps.$inferSelect
export type NewPhoneOtp = typeof phoneOtps.$inferInsert

// =============================
// Hotels
// =============================

export const hotels = pgTable(
  "hotels",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" })
      .$type<UUID>(),
    name: text("name").notNull(),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  t => [index("hotels_org_idx").on(t.organizationId)]
)

export type Hotel = typeof hotels.$inferSelect
export type NewHotel = typeof hotels.$inferInsert

// =============================
// Hotel Roles
// =============================

export const hotelUserRoles = pgTable(
  "hotel_user_roles",
  {
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" })
      .$type<UUID>(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .$type<UUID>(),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
  },
  t => [primaryKey({ columns: [t.hotelId, t.userId, t.roleId] })]
)

export type HotelUserRole = typeof hotelUserRoles.$inferSelect
export type NewHotelUserRole = typeof hotelUserRoles.$inferInsert

// =============================
// Room Group
// =============================

export const roomGroup = pgTable(
  "room_group",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      })
      .$type<UUID>(),
    hotelId: uuid("hotel_id")
      .references(() => hotels.id, {
        onDelete: "cascade",
      })
      .$type<UUID>(),
    // if the hotelId is set it is hotels level if not its org level
  },
  t => [
    index("room_groups_org_idx").on(t.organizationId),
    index("room_groups_hotel_idx").on(t.hotelId),
  ]
)

export type FeatureKeys = "wifi" | "finance" // ...
export type FeatureValues = true | false
export type Feature = Record<string, FeatureValues>

export const rooms = pgTable(
  "rooms",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" })
      .$type<UUID>(),
    groupId: uuid("group_id")
      .references(() => roomGroup.id, {
        onDelete: "set null",
      })
      .$type<UUID>(),
    name: text("name").notNull(),
    singleBeds: integer("single_beds").default(0).notNull(),
    doubleBeds: integer("double_beds").default(0).notNull(),
  },
  t => [index().on(t.hotelId), unique().on(t.hotelId, t.name)]
)

export const guests = pgTable(
  "guests",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" })
      .$type<UUID>(),
    fullName: text("full_name").notNull(),
    phone: varchar("phone", { length: 16 }).unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    description: text("description"),
  },
  t => [
    index("guests_org_idx").on(t.organizationId),
    index("guests_org_phone_idx").on(t.organizationId, t.phone),
  ]
)

export const reservations = pgTable(
  "reservations",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" })
      .$type<UUID>(),
    guestId: uuid("guest_id")
      .references(() => guests.id, {
        onDelete: "set null",
      })
      .$type<UUID>(),
    roomId: uuid("room_id")
      .references(() => rooms.id, {
        onDelete: "set null",
      })
      .$type<UUID>(),
    checkIn: timestamp("check_in").notNull(),
    checkOut: timestamp("check_out").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    checkedInAt: timestamp("checked_in_at"), // actual check in timestamp
    checkedOutAt: timestamp("checked_out_at"), // actual check out timestamp
    status: text("status")
      .$type<"reserved" | "checked-in" | "checked-out" | "cancelled">()
      .default("reserved"),
  },
  t => [
    index("res_org_idx").on(t.organizationId),
    index("res_org_dates_idx").on(t.organizationId, t.checkIn, t.checkOut),
    index("res_room_dates_idx").on(t.roomId, t.checkIn, t.checkOut),
    index("res_org_status_idx").on(t.organizationId, t.status),
  ]
)
