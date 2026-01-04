/*
  Warnings:

  - You are about to drop the `OperationType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WagonOperation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WagonState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wagon_owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wagon_types` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Station` will be added. If there are existing duplicate values, this will fail.
  - Made the column `owner_id` on table `Wagon` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Wagon" DROP CONSTRAINT "Wagon_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Wagon" DROP CONSTRAINT "Wagon_type_id_fkey";

-- DropForeignKey
ALTER TABLE "WagonOperation" DROP CONSTRAINT "WagonOperation_typeId_fkey";

-- DropForeignKey
ALTER TABLE "WagonOperation" DROP CONSTRAINT "WagonOperation_wagonStateId_fkey";

-- DropForeignKey
ALTER TABLE "WagonState" DROP CONSTRAINT "WagonState_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "WagonState" DROP CONSTRAINT "WagonState_station_id_fkey";

-- DropForeignKey
ALTER TABLE "WagonState" DROP CONSTRAINT "WagonState_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "WagonState" DROP CONSTRAINT "WagonState_wagon_id_fkey";

-- AlterTable
ALTER TABLE "Wagon" ALTER COLUMN "owner_id" SET NOT NULL;

-- DropTable
DROP TABLE "OperationType";

-- DropTable
DROP TABLE "WagonOperation";

-- DropTable
DROP TABLE "WagonState";

-- DropTable
DROP TABLE "wagon_owner";

-- DropTable
DROP TABLE "wagon_types";

-- CreateTable
CREATE TABLE "Wagon_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number_prefix" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagon_owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagon_state" (
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

    CONSTRAINT "Wagon_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normative" DECIMAL(10,3) NOT NULL,
    "category" "OperationCategory" NOT NULL,

    CONSTRAINT "Operation_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wagon_operation" (
    "id" TEXT NOT NULL,
    "wagonStateId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wagon_operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wagon_types_name_key" ON "Wagon_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Wagon_owner_name_key" ON "Wagon_owner"("name");

-- CreateIndex
CREATE INDEX "Wagon_state_wagon_id_idx" ON "Wagon_state"("wagon_id");

-- CreateIndex
CREATE INDEX "Wagon_state_trip_id_idx" ON "Wagon_state"("trip_id");

-- CreateIndex
CREATE INDEX "Wagon_state_station_id_idx" ON "Wagon_state"("station_id");

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- CreateIndex
CREATE INDEX "Station_type_idx" ON "Station"("type");

-- AddForeignKey
ALTER TABLE "Wagon" ADD CONSTRAINT "Wagon_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Wagon_owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon" ADD CONSTRAINT "Wagon_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Wagon_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_state" ADD CONSTRAINT "Wagon_state_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "Cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_state" ADD CONSTRAINT "Wagon_state_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_state" ADD CONSTRAINT "Wagon_state_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_state" ADD CONSTRAINT "Wagon_state_wagon_id_fkey" FOREIGN KEY ("wagon_id") REFERENCES "Wagon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_operation" ADD CONSTRAINT "Wagon_operation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Operation_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wagon_operation" ADD CONSTRAINT "Wagon_operation_wagonStateId_fkey" FOREIGN KEY ("wagonStateId") REFERENCES "Wagon_state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
