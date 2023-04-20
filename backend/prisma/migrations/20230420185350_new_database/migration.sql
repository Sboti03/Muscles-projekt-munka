-- CreateTable
CREATE TABLE "weightHistory" (
    "weightId" SERIAL NOT NULL,
    "dayId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weightIdPK" PRIMARY KEY ("weightId")
);

-- CreateTable
CREATE TABLE "units" (
    "unitId" SERIAL NOT NULL,
    "unit" VARCHAR(30) NOT NULL,
    "defaultValue" DOUBLE PRECISION NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unitIdPK" PRIMARY KEY ("unitId")
);

-- CreateTable
CREATE TABLE "foods" (
    "foodId" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "unitId" INTEGER NOT NULL,
    "perUnit" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "saturatedFat" DOUBLE PRECISION,
    "polyunsaturatedFat" DOUBLE PRECISION,
    "monounsaturatedFat" DOUBLE PRECISION,
    "carbohydrate" DOUBLE PRECISION NOT NULL,
    "sugar" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foodIdPK" PRIMARY KEY ("foodId")
);

-- CreateTable
CREATE TABLE "connections" (
    "connectionId" SERIAL NOT NULL,
    "coachId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessAll" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "connectionIdPK" PRIMARY KEY ("connectionId")
);

-- CreateTable
CREATE TABLE "connectionRequest" (
    "connectionRequestId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestBy" INTEGER NOT NULL,
    "accessAll" BOOLEAN NOT NULL DEFAULT false,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connectionRequest_pkey" PRIMARY KEY ("connectionRequestId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roleId" INTEGER NOT NULL,
    "refreshTokens" TEXT[],
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userIdPK" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "schedules" (
    "scheduleId" SERIAL NOT NULL,
    "connectionId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rate" INTEGER,
    "reply" TEXT,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduleIdPK" PRIMARY KEY ("scheduleId")
);

-- CreateTable
CREATE TABLE "mealSchedule" (
    "mealScheduleId" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mealScheduleIdPK" PRIMARY KEY ("mealScheduleId")
);

-- CreateTable
CREATE TABLE "mealHistory" (
    "mealHistoryId" SERIAL NOT NULL,
    "dayId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,
    "periodName" VARCHAR(30) NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mealHistoryIdPK" PRIMARY KEY ("mealHistoryId")
);

-- CreateTable
CREATE TABLE "meals" (
    "mealId" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "addedBy" TEXT NOT NULL DEFAULT 'user',
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "mealIdPK" PRIMARY KEY ("mealId")
);

-- CreateTable
CREATE TABLE "dayHistory" (
    "dayId" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,

    CONSTRAINT "dayIdPK" PRIMARY KEY ("dayId")
);

-- CreateTable
CREATE TABLE "mealPeriods" (
    "periodName" VARCHAR(30) NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periodNameIdPK" PRIMARY KEY ("periodName")
);

-- CreateTable
CREATE TABLE "profileData" (
    "profileId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "registrationDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(100) NOT NULL DEFAULT '',
    "birthDay" DATE,
    "lastName" VARCHAR(200),
    "height" DOUBLE PRECISION,
    "male" BOOLEAN NOT NULL DEFAULT true,
    "profilePicPath" TEXT NOT NULL DEFAULT '',
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profileIdPK" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "goals" (
    "goalId" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "targetWeight" DOUBLE PRECISION NOT NULL DEFAULT 70,
    "targetCalories" DOUBLE PRECISION NOT NULL DEFAULT 2000,
    "carbohydratesPerDay" INTEGER NOT NULL DEFAULT 50,
    "proteinPerDay" INTEGER NOT NULL DEFAULT 30,
    "fatPerDay" INTEGER NOT NULL DEFAULT 20,
    "breakfastPerDay" INTEGER NOT NULL DEFAULT 30,
    "lunchPerDay" INTEGER NOT NULL DEFAULT 40,
    "dinnerPerDay" INTEGER NOT NULL DEFAULT 25,
    "otherPerDay" INTEGER NOT NULL DEFAULT 5,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("goalId")
);

-- CreateTable
CREATE TABLE "roles" (
    "roleId" SERIAL NOT NULL,
    "roleName" VARCHAR(50) NOT NULL,
    "changedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roleIdPK" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "weightHistory_dayId_key" ON "weightHistory"("dayId");

-- CreateIndex
CREATE UNIQUE INDEX "unitUQ" ON "units"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "foods_name_key" ON "foods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "connections_userId_coachId_key" ON "connections"("userId", "coachId");

-- CreateIndex
CREATE UNIQUE INDEX "connectionRequest_userId_coachId_key" ON "connectionRequest"("userId", "coachId");

-- CreateIndex
CREATE UNIQUE INDEX "emailUQ" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dayIdProfileIdUQ" ON "dayHistory"("date", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "profileData_userId_key" ON "profileData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "goals_profileId_key" ON "goals"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "goals_profileId_date_key" ON "goals"("profileId", "date");

-- AddForeignKey
ALTER TABLE "weightHistory" ADD CONSTRAINT "dayIdFK" FOREIGN KEY ("dayId") REFERENCES "dayHistory"("dayId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "unitIdFK" FOREIGN KEY ("unitId") REFERENCES "units"("unitId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "userIdFK" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "coachIdFK" FOREIGN KEY ("coachId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "connectionRequest" ADD CONSTRAINT "connectionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connectionRequest" ADD CONSTRAINT "connectionRequest_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "roleIdFK" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connections"("connectionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealSchedule" ADD CONSTRAINT "mealSchedule_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("mealId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealSchedule" ADD CONSTRAINT "mealSchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("scheduleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealHistory" ADD CONSTRAINT "mealHistory_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "dayHistory"("dayId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealHistory" ADD CONSTRAINT "mealHistory_periodName_fkey" FOREIGN KEY ("periodName") REFERENCES "mealPeriods"("periodName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealHistory" ADD CONSTRAINT "mealIdFK" FOREIGN KEY ("mealId") REFERENCES "meals"("mealId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("foodId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dayHistory" ADD CONSTRAINT "profileIdFK" FOREIGN KEY ("profileId") REFERENCES "profileData"("profileId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profileData" ADD CONSTRAINT "userIdFK" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profileData"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
