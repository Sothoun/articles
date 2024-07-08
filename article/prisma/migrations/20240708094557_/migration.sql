/*
  Warnings:

  - You are about to drop the column `created_by_user_id` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `is_published` on the `Article` table. All the data in the column will be lost.
  - Added the required column `created_user_id` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_created_by_user_id_fkey";

-- DropIndex
DROP INDEX "Article_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "created_by_user_id",
DROP COLUMN "is_published",
ADD COLUMN     "created_user_id" INTEGER NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_created_user_id_fkey" FOREIGN KEY ("created_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
