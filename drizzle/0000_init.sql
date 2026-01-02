CREATE TYPE "public"."reservation_status" AS ENUM('reserved', 'checked-in', 'checked-out', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."staff_role" AS ENUM('owner', 'manager', 'receptionist', 'staff');--> statement-breakpoint
CREATE TABLE "guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"full_name" text NOT NULL,
	"phone" varchar(16),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "hotels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"address" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "phone_otps" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar(16) NOT NULL,
	"code" varchar(6) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"verified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"guest_id" uuid,
	"room_id" uuid,
	"check_in" timestamp NOT NULL,
	"check_out" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"checked_in_at" timestamp,
	"checked_out_at" timestamp,
	"status" "reservation_status" DEFAULT 'reserved' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"name" text NOT NULL,
	"single_beds" integer DEFAULT 0 NOT NULL,
	"double_beds" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rooms_hotel_name_unique" UNIQUE("hotel_id","name")
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone" varchar(16) NOT NULL,
	"role" "staff_role" DEFAULT 'staff' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "staff_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_guest_id_guests_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."guests"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "guests_hotel_idx" ON "guests" USING btree ("hotel_id");--> statement-breakpoint
CREATE INDEX "guests_hotel_phone_idx" ON "guests" USING btree ("hotel_id","phone");--> statement-breakpoint
CREATE INDEX "phone_otps_phone_idx" ON "phone_otps" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "res_hotel_idx" ON "reservations" USING btree ("hotel_id");--> statement-breakpoint
CREATE INDEX "res_hotel_dates_idx" ON "reservations" USING btree ("hotel_id","check_in","check_out");--> statement-breakpoint
CREATE INDEX "res_room_dates_idx" ON "reservations" USING btree ("room_id","check_in","check_out");--> statement-breakpoint
CREATE INDEX "res_hotel_status_idx" ON "reservations" USING btree ("hotel_id","status");--> statement-breakpoint
CREATE INDEX "rooms_hotel_idx" ON "rooms" USING btree ("hotel_id");--> statement-breakpoint
CREATE INDEX "staff_hotel_idx" ON "staff" USING btree ("hotel_id");