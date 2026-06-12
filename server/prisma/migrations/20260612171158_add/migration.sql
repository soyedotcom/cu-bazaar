-- AlterTable
ALTER TABLE "Withdrawal" ADD COLUMN     "bankCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bankSlug" TEXT NOT NULL DEFAULT '';
