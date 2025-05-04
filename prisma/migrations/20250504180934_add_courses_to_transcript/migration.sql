/*
  Warnings:

  - You are about to drop the column `ects` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Course` table. All the data in the column will be lost.
  - Made the column `grade` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transcriptId` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_transcriptId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "ects",
DROP COLUMN "semester",
ALTER COLUMN "grade" SET NOT NULL,
ALTER COLUMN "transcriptId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;
