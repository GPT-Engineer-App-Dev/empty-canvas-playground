-- Create airports table
CREATE TABLE IF NOT EXISTS "public"."airports" (
    "id" SERIAL PRIMARY KEY,
    "code" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create airlines table
CREATE TABLE IF NOT EXISTS "public"."airlines" (
    "id" SERIAL PRIMARY KEY,
    "code" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Modify flights table to reference airports and airlines
ALTER TABLE "public"."flights"
    ADD COLUMN "departure_airport_id" INTEGER REFERENCES "public"."airports"("id"),
    ADD COLUMN "arrival_airport_id" INTEGER REFERENCES "public"."airports"("id"),
    ADD COLUMN "airline_id" INTEGER REFERENCES "public"."airlines"("id");

-- Update existing flights to use the new foreign keys
-- Note: This assumes that the airports and airlines data will be inserted before this migration runs
UPDATE "public"."flights" f
SET 
    departure_airport_id = (SELECT id FROM "public"."airports" WHERE code = f.departure_airport),
    arrival_airport_id = (SELECT id FROM "public"."airports" WHERE code = f.arrival_airport),
    airline_id = (SELECT id FROM "public"."airlines" WHERE name = f.airline);

-- Drop old columns
ALTER TABLE "public"."flights"
    DROP COLUMN "departure_airport",
    DROP COLUMN "arrival_airport",
    DROP COLUMN "airline";

-- Grant permissions
GRANT ALL ON TABLE "public"."airports" TO "anon", "authenticated", "service_role";
GRANT ALL ON TABLE "public"."airlines" TO "anon", "authenticated", "service_role";
GRANT USAGE, SELECT ON SEQUENCE "public"."airports_id_seq" TO "anon", "authenticated", "service_role";
GRANT USAGE, SELECT ON SEQUENCE "public"."airlines_id_seq" TO "anon", "authenticated", "service_role";
