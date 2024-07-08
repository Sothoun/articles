/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `createdByUserId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Article` table. All the data in the column will be lost.
  - Added the required column `created_by_user_id` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_published` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_createdByUserId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "createdAt",
DROP COLUMN "createdByUserId",
DROP COLUMN "isPublished",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_user_id" INTEGER NOT NULL,
ADD COLUMN     "is_published" BOOLEAN NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
