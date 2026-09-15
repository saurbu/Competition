-- CreateEnum
CREATE TYPE "CompetitionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'UNPUBLISHED');

-- CreateEnum
CREATE TYPE "CompetitionMode" AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "CompetitionCategory" AS ENUM ('CODING', 'DESIGN', 'BUSINESS', 'INNOVATION', 'ACADEMIC', 'QUIZ', 'HACKATHON', 'DEBATE', 'OTHER');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('REGISTERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "category" "CompetitionCategory" NOT NULL,
    "mode" "CompetitionMode" NOT NULL,
    "registrationStart" TIMESTAMP(3) NOT NULL,
    "registrationDeadline" TIMESTAMP(3) NOT NULL,
    "competitionStart" TIMESTAMP(3) NOT NULL,
    "competitionEnd" TIMESTAMP(3) NOT NULL,
    "prizePool" INTEGER NOT NULL,
    "status" "CompetitionStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionPrize" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "CompetitionPrize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionEligibility" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CompetitionEligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionRule" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CompetitionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionInstruction" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CompetitionInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionRegistration" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "college" TEXT,
    "phone" TEXT,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'REGISTERED',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitionRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionBookmark" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitionBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Competition_slug_key" ON "Competition"("slug");

-- CreateIndex
CREATE INDEX "Competition_category_idx" ON "Competition"("category");

-- CreateIndex
CREATE INDEX "Competition_mode_idx" ON "Competition"("mode");

-- CreateIndex
CREATE INDEX "Competition_status_idx" ON "Competition"("status");

-- CreateIndex
CREATE INDEX "Competition_registrationDeadline_idx" ON "Competition"("registrationDeadline");

-- CreateIndex
CREATE INDEX "Competition_prizePool_idx" ON "Competition"("prizePool");

-- CreateIndex
CREATE INDEX "CompetitionPrize_competitionId_idx" ON "CompetitionPrize"("competitionId");

-- CreateIndex
CREATE INDEX "CompetitionEligibility_competitionId_idx" ON "CompetitionEligibility"("competitionId");

-- CreateIndex
CREATE INDEX "CompetitionRule_competitionId_idx" ON "CompetitionRule"("competitionId");

-- CreateIndex
CREATE INDEX "CompetitionInstruction_competitionId_idx" ON "CompetitionInstruction"("competitionId");

-- CreateIndex
CREATE INDEX "CompetitionRegistration_userId_idx" ON "CompetitionRegistration"("userId");

-- CreateIndex
CREATE INDEX "CompetitionRegistration_competitionId_idx" ON "CompetitionRegistration"("competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionRegistration_competitionId_userId_key" ON "CompetitionRegistration"("competitionId", "userId");

-- CreateIndex
CREATE INDEX "CompetitionBookmark_userId_idx" ON "CompetitionBookmark"("userId");

-- CreateIndex
CREATE INDEX "CompetitionBookmark_competitionId_idx" ON "CompetitionBookmark"("competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionBookmark_competitionId_userId_key" ON "CompetitionBookmark"("competitionId", "userId");

-- AddForeignKey
ALTER TABLE "CompetitionPrize" ADD CONSTRAINT "CompetitionPrize_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionEligibility" ADD CONSTRAINT "CompetitionEligibility_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionRule" ADD CONSTRAINT "CompetitionRule_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionInstruction" ADD CONSTRAINT "CompetitionInstruction_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionRegistration" ADD CONSTRAINT "CompetitionRegistration_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionBookmark" ADD CONSTRAINT "CompetitionBookmark_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
