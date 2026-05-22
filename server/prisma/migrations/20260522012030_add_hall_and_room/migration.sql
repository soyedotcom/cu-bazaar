/*
  Warnings:

  - Added the required column `hall` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hall" TEXT NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL;
