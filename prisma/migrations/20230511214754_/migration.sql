/*
  Warnings:

  - Changed the type of `heightIn` on the `DogBreed` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longevityYrs` on the `DogBreed` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DogBreed" DROP COLUMN "heightIn";
ALTER TABLE "DogBreed" ADD COLUMN     "heightIn" STRING NOT NULL;
ALTER TABLE "DogBreed" DROP COLUMN "longevityYrs";
ALTER TABLE "DogBreed" ADD COLUMN     "longevityYrs" STRING NOT NULL;
