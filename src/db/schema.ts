import type { UUID } from "node:crypto"
import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

// =============================
// Enums
// =============================

export const staffRoleEnum = pgEnum("staff_role", [
  "owner",
  "manager",
  "receptionist",
  "staff",
])

export const reservationStatusEnum = pgEnum("reservation_status", [
  "reserved",
  "checked-in",
  "checked-out",
  "cancelled",
])

// =============================
// Hotels
// =============================

export const hotels = pgTable("hotels", {
  id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
  name: text("name").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Hotel = typeof hotels.$inferSelect
export type NewHotel = typeof hotels.$inferInsert

// =============================
// Staff
// =============================

export const staff = pgTable(
  "staff",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id, {
        onDelete: "cascade",
      })
      .$type<UUID>(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 16 }).notNull().unique(),
    role: staffRoleEnum("role").notNull().default("staff"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  t => [index("staff_hotel_idx").on(t.hotelId)]
)

export type Staff = typeof staff.$inferSelect
export type NewStaff = typeof staff.$inferInsert

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
// Rooms
// =============================

export const rooms = pgTable(
  "rooms",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" })
      .$type<UUID>(),
    name: text("name").notNull(),
    singleBeds: integer("single_beds").default(0).notNull(),
    doubleBeds: integer("double_beds").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  t => [
    index("rooms_hotel_idx").on(t.hotelId),
    unique("rooms_hotel_name_unique").on(t.hotelId, t.name),
  ]
)

export type Room = typeof rooms.$inferSelect
export type NewRoom = typeof rooms.$inferInsert

// =============================
// Guests
// =============================

export const guests = pgTable(
  "guests",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" })
      .$type<UUID>(),
    fullName: text("full_name").notNull(),
    phone: varchar("phone", { length: 16 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    description: text("description"),
  },
  t => [
    index("guests_hotel_idx").on(t.hotelId),
    index("guests_hotel_phone_idx").on(t.hotelId, t.phone),
  ]
)

export type Guest = typeof guests.$inferSelect
export type NewGuest = typeof guests.$inferInsert

// =============================
// Reservations
// =============================

export const reservations = pgTable(
  "reservations",
  {
    id: uuid("id").defaultRandom().primaryKey().$type<UUID>(),
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" })
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
    checkedInAt: timestamp("checked_in_at"),
    checkedOutAt: timestamp("checked_out_at"),
    status: reservationStatusEnum("status").default("reserved").notNull(),
  },
  t => [
    index("res_hotel_idx").on(t.hotelId),
    index("res_hotel_dates_idx").on(t.hotelId, t.checkIn, t.checkOut),
    index("res_room_dates_idx").on(t.roomId, t.checkIn, t.checkOut),
    index("res_hotel_status_idx").on(t.hotelId, t.status),
  ]
)

export type Reservation = typeof reservations.$inferSelect
export type NewReservation = typeof reservations.$inferInsert

// =============================
// RELATIONS
// =============================

// Hotels Relations
export const hotelsRelations = relations(hotels, ({ many }) => ({
  staff: many(staff),
  rooms: many(rooms),
  guests: many(guests),
  reservations: many(reservations),
}))

// Staff Relations
export const staffRelations = relations(staff, ({ one }) => ({
  hotel: one(hotels, {
    fields: [staff.hotelId],
    references: [hotels.id],
  }),
}))

// Rooms Relations
export const roomsRelations = relations(rooms, ({ one, many }) => ({
  hotel: one(hotels, {
    fields: [rooms.hotelId],
    references: [hotels.id],
  }),
  reservations: many(reservations),
}))

// Guests Relations
export const guestsRelations = relations(guests, ({ one, many }) => ({
  hotel: one(hotels, {
    fields: [guests.hotelId],
    references: [hotels.id],
  }),
  reservations: many(reservations),
}))

// Reservations Relations
export const reservationsRelations = relations(reservations, ({ one }) => ({
  hotel: one(hotels, {
    fields: [reservations.hotelId],
    references: [hotels.id],
  }),
  guest: one(guests, {
    fields: [reservations.guestId],
    references: [guests.id],
  }),
  room: one(rooms, {
    fields: [reservations.roomId],
    references: [rooms.id],
  }),
}))
