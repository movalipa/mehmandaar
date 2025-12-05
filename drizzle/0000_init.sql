CREATE TABLE "guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"full_name" text NOT NULL,
	"phone" varchar(16),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	CONSTRAINT "guests_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "hotel_user_roles" (
	"hotel_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role_id" integer NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "hotel_user_roles_hotel_id_user_id_role_id_pk" PRIMARY KEY("hotel_id","user_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "hotels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"address" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_user_roles" (
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role_id" integer NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organization_user_roles_organization_id_user_id_role_id_pk" PRIMARY KEY("organization_id","user_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
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
	"organization_id" uuid NOT NULL,
	"guest_id" uuid,
	"room_id" uuid,
	"check_in" timestamp NOT NULL,
	"check_out" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"checked_in_at" timestamp,
	"checked_out_at" timestamp,
	"status" text DEFAULT 'reserved'
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"permissions" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "room_group" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"organization_id" uuid NOT NULL,
	"hotel_id" uuid
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"group_id" uuid,
	"name" text NOT NULL,
	"single_beds" integer DEFAULT 0 NOT NULL,
	"double_beds" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "rooms_hotelId_name_unique" UNIQUE("hotel_id","name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone" varchar(16) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_user_roles" ADD CONSTRAINT "hotel_user_roles_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_user_roles" ADD CONSTRAINT "hotel_user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_user_roles" ADD CONSTRAINT "hotel_user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_roles" ADD CONSTRAINT "organization_user_roles_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_roles" ADD CONSTRAINT "organization_user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_roles" ADD CONSTRAINT "organization_user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_guest_id_guests_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."guests"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room_group" ADD CONSTRAINT "room_group_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room_group" ADD CONSTRAINT "room_group_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_group_id_room_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."room_group"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "guests_org_idx" ON "guests" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "guests_org_phone_idx" ON "guests" USING btree ("organization_id","phone");--> statement-breakpoint
CREATE INDEX "hotels_org_idx" ON "hotels" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "phone_otps_phone_idx" ON "phone_otps" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "res_org_idx" ON "reservations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "res_org_dates_idx" ON "reservations" USING btree ("organization_id","check_in","check_out");--> statement-breakpoint
CREATE INDEX "res_room_dates_idx" ON "reservations" USING btree ("room_id","check_in","check_out");--> statement-breakpoint
CREATE INDEX "res_org_status_idx" ON "reservations" USING btree ("organization_id","status");--> statement-breakpoint
CREATE INDEX "room_groups_org_idx" ON "room_group" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "room_groups_hotel_idx" ON "room_group" USING btree ("hotel_id");--> statement-breakpoint
CREATE INDEX "rooms_hotel_id_index" ON "rooms" USING btree ("hotel_id");