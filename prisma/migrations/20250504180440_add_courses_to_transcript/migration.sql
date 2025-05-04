-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "gpa" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "ects" DOUBLE PRECISION NOT NULL,
    "grade" TEXT,
    "semester" TEXT,
    "transcriptId" INTEGER,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_transcriptId_idx" ON "Course"("transcriptId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;
