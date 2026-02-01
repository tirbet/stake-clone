/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `deposits` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `withdrawals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentId,reference]` on the table `deposits` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentId,reference]` on the table `withdrawals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `deposits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `withdrawals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('crypto', 'mobile_money', 'bank_transfer', 'card', 'e_wallet');

-- DropIndex
DROP INDEX "deposits_paymentMethod_reference_key";

-- DropIndex
DROP INDEX "withdrawals_paymentMethod_reference_key";

-- AlterTable
ALTER TABLE "deposits" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "withdrawals" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PaymentMethod";

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PaymentMethodType" NOT NULL,
    "provider" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "settings" JSONB NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "description" TEXT,
    "minAmount" DECIMAL(18,2),
    "maxAmount" DECIMAL(18,2),
    "feePercentage" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "feeFixed" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_methods_type_idx" ON "payment_methods"("type");

-- CreateIndex
CREATE INDEX "payment_methods_isActive_idx" ON "payment_methods"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "deposits_paymentId_reference_key" ON "deposits"("paymentId", "reference");

-- CreateIndex
CREATE UNIQUE INDEX "withdrawals_paymentId_reference_key" ON "withdrawals"("paymentId", "reference");

-- AddForeignKey
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
