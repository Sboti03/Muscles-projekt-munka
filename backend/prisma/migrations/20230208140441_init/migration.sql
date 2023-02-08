/*
  Warnings:

  - Added the required column `coachId` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connections" ADD COLUMN     "coachId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "mealSchedule" (
    "mealScheduleId" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "changedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "mealScheduleIdPK" PRIMARY KEY ("mealScheduleId")
);

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "coachIdFK" FOREIGN KEY ("coachId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "userIdFK" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connections"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealSchedule" ADD CONSTRAINT "mealSchedule_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("mealId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealSchedule" ADD CONSTRAINT "mealSchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("scheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;
