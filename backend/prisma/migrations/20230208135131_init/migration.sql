-- CreateTable
CREATE TABLE "weightHistory" (
    "weightId" SERIAL NOT NULL,
    "dayId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "weightIdPK" PRIMARY KEY ("weightId")
);

-- CreateTable
CREATE TABLE "units" (
    "unitId" SERIAL NOT NULL,
    "unit" VARCHAR(30) NOT NULL,
    "defaultValue" DOUBLE PRECISION NOT NULL,

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

    CONSTRAINT "foodIdPK" PRIMARY KEY ("foodId")
);

-- CreateTable
CREATE TABLE "connections" (
    "connectionId" SERIAL NOT NULL,

    CONSTRAINT "connectionIdPK" PRIMARY KEY ("connectionId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "userIdPK" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "schedules" (
    "scheduleId" SERIAL NOT NULL,
    "connectionId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rate" INTEGER,
    "reply" TEXT,

    CONSTRAINT "scheduleIdPK" PRIMARY KEY ("scheduleId")
);

-- CreateTable
CREATE TABLE "mealHistory" (
    "mealHistoryId" SERIAL NOT NULL,
    "dayId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,
    "periodName" VARCHAR(30) NOT NULL,

    CONSTRAINT "mealHistoryIdPK" PRIMARY KEY ("mealHistoryId")
);

-- CreateTable
CREATE TABLE "meals" (
    "mealId" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "addedBy" TEXT NOT NULL DEFAULT 'user',
    "changedAt" TIMESTAMP NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "mealIdPK" PRIMARY KEY ("mealId")
);

-- CreateTable
CREATE TABLE "dayHistory" (
    "dayId" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "dayIdPK" PRIMARY KEY ("dayId")
);

-- CreateTable
CREATE TABLE "mealPeriods" (
    "periodName" VARCHAR(30) NOT NULL,

    CONSTRAINT "periodNameIdPK" PRIMARY KEY ("periodName")
);

-- CreateTable
CREATE TABLE "profileData" (
    "profileId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "registration_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(100) NOT NULL,
    "birthDay" DATE NOT NULL,
    "lastName" VARCHAR(200),
    "height" DOUBLE PRECISION,
    "targetWeight" DOUBLE PRECISION,

    CONSTRAINT "profileIdPK" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "roles" (
    "roleId" SERIAL NOT NULL,
    "roleName" VARCHAR(50) NOT NULL,

    CONSTRAINT "roleIdPK" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "unitUQ" ON "units"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "emailUQ" ON "users"("email");

-- AddForeignKey
ALTER TABLE "weightHistory" ADD CONSTRAINT "dayIdFK" FOREIGN KEY ("dayId") REFERENCES "dayHistory"("dayId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "unitIdFK" FOREIGN KEY ("unitId") REFERENCES "units"("unitId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "roleIdFK" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mealHistory" ADD CONSTRAINT "mealHistory_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "dayHistory"("dayId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealHistory" ADD CONSTRAINT "mealIdFK" FOREIGN KEY ("mealId") REFERENCES "meals"("mealId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealHistory" ADD CONSTRAINT "mealHistory_periodName_fkey" FOREIGN KEY ("periodName") REFERENCES "mealPeriods"("periodName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("foodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dayHistory" ADD CONSTRAINT "profileIdFK" FOREIGN KEY ("profileId") REFERENCES "profileData"("profileId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profileData" ADD CONSTRAINT "userIdFK" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;
