/*
  Warnings:

  - Changed the type of `resource` on the `Permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "resource",
ADD COLUMN     "resource" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."PermissionResource";

-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_resource_key" ON "Permission"("roleId", "resource");
