/*
  Warnings:

  - Added the required column `likes` to the `site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "site" ADD COLUMN     "likes" TEXT NOT NULL;
