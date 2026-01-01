-- CreateEnum
CREATE TYPE "OperationCategory" AS ENUM ('ACTIVE', 'PASSIVE');

-- CreateEnum
CREATE TYPE "StationType" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateTable
CREATE TABLE "Wagon" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "owner_id" TEXT,
    "bar_package" DECIMAL(10,3) NOT NULL,
    "capacity" DECIMAL(10,3) NOT NULL,
    "volume" DECIMAL(10,3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wagon_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wagon_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wagon_owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wagon_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "national_code" TEXT NOT NULL,
    "international_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "type" "StationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WagonState" (
    "id" TEXT NOT NULL,
    "wagon_id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "cargo_id" TEXT,
    "isEmpty" BOOLEAN NOT NULL,
    "station_id" TEXT,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WagonState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normative" DECIMAL(10,3) NOT NULL,
    "category" "OperationCategory" NOT NULL,

    CONSTRAINT "OperationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WagonOperation" (
    "id" TEXT NOT NULL,
    "wagonStateId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WagonOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wagon_number_key" ON "Wagon"("number");

-- CreateIndex
CREATE INDEX "Wagon_type_id_idx" ON "Wagon"("type_id");

-- CreateIndex
CREATE INDEX "Wagon_owner_id_idx" ON "Wagon"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "wagon_types_name_key" ON "wagon_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "wagon_owner_name_key" ON "wagon_owner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_name_key" ON "Cargo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_national_code_key" ON "Cargo"("national_code");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_international_code_key" ON "Cargo"("international_code");

-- CreateIndex
CREATE UNIQUE INDEX "Station_code_key" ON "Station"("code");

-- CreateIndex
CREATE INDEX "WagonState_wagon_id_idx" ON "WagonState"("wagon_id");

-- CreateIndex
CREATE INDEX "WagonState_trip_id_idx" ON "WagonState"("trip_id");

-- CreateIndex
CREATE INDEX "WagonState_station_id_idx" ON "WagonState"("station_id");

-- AddForeignKey
ALTER TABLE "Wagon" ADD CONSTRAINT "Wagon_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "wagon_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon" ADD CONSTRAINT "Wagon_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "wagon_owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WagonState" ADD CONSTRAINT "WagonState_wagon_id_fkey" FOREIGN KEY ("wagon_id") REFERENCES "Wagon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WagonState" ADD CONSTRAINT "WagonState_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WagonState" ADD CONSTRAINT "WagonState_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "Cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WagonState" ADD CONSTRAINT "WagonState_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WagonOperation" ADD CONSTRAINT "WagonOperation_wagonStateId_fkey" FOREIGN KEY ("wagonStateId") REFERENCES "WagonState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WagonOperation" ADD CONSTRAINT "WagonOperation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "OperationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
