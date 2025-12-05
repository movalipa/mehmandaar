ALTER TABLE "rooms" DROP CONSTRAINT "rooms_hotelId_name_unique";--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotel_id_name_unique" UNIQUE("hotel_id","name");