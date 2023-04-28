create table _prisma_migrations
(
    id                  varchar(36)                            not null
        primary key,
    checksum            varchar(64)                            not null,
    finished_at         timestamp with time zone,
    migration_name      varchar(255)                           not null,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone default now() not null,
    applied_steps_count integer                  default 0     not null
);

alter table _prisma_migrations
    owner to postgres;

create table units
(
    "unitId"       serial
        constraint "unitIdPK"
            primary key,
    unit           varchar(30)                            not null,
    "defaultValue" double precision                       not null,
    "changedAt"    timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table units
    owner to postgres;

create unique index "unitUQ"
    on units (unit);

create table foods
(
    "foodId"             serial
        constraint "foodIdPK"
            primary key,
    name                 varchar(200)                           not null,
    kcal                 double precision                       not null,
    "unitId"             integer                                not null
        constraint "unitIdFK"
            references units
            on update cascade on delete restrict,
    "perUnit"            double precision                       not null,
    protein              double precision                       not null,
    fat                  double precision                       not null,
    "saturatedFat"       double precision,
    "polyunsaturatedFat" double precision,
    "monounsaturatedFat" double precision,
    carbohydrate         double precision                       not null,
    sugar                double precision,
    fiber                double precision,
    "isDeleted"          boolean      default false             not null,
    "changedAt"          timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table foods
    owner to postgres;

create unique index foods_name_key
    on foods (name);

create table meals
(
    "mealId"    serial
        constraint "mealIdPK"
            primary key,
    "foodId"    integer                                not null
        references foods
            on update cascade,
    amount      double precision                       not null,
    "addedBy"   text         default 'user'::text      not null,
    "changedAt" timestamp(6) default CURRENT_TIMESTAMP not null,
    completed   boolean      default false             not null
);

alter table meals
    owner to postgres;

create table "mealPeriods"
(
    "periodName" varchar(30)                            not null
        constraint "periodNameIdPK"
            primary key,
    "changedAt"  timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table "mealPeriods"
    owner to postgres;

create table roles
(
    "roleId"    serial
        constraint "roleIdPK"
            primary key,
    "roleName"  varchar(50)                            not null,
    "changedAt" timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table roles
    owner to postgres;

create table users
(
    "userId"        serial
        constraint "userIdPK"
            primary key,
    email           varchar(255)                           not null,
    password        varchar(255)                           not null,
    "roleId"        integer                                not null
        constraint "roleIdFK"
            references roles,
    "refreshTokens" text[],
    "changedAt"     timestamp(6) default CURRENT_TIMESTAMP not null,
    "isBlocked"     boolean      default false             not null,
    "isDeleted"     boolean      default false             not null
);

alter table users
    owner to postgres;

create table connections
(
    "connectionId" serial
        constraint "connectionIdPK"
            primary key,
    "coachId"      integer                                not null
        constraint "coachIdFK"
            references users
            on delete cascade,
    "userId"       integer                                not null
        constraint "userIdFK"
            references users
            on delete cascade,
    "changedAt"    timestamp(6) default CURRENT_TIMESTAMP not null,
    "accessAll"    boolean      default false             not null
);

alter table connections
    owner to postgres;

create unique index "connections_userId_coachId_key"
    on connections ("userId", "coachId");

create table "connectionRequest"
(
    "connectionRequestId" serial
        primary key,
    "userId"              integer                                not null
        references users
            on update cascade on delete cascade,
    "coachId"             integer                                not null
        references users
            on update cascade on delete cascade,
    "requestDate"         timestamp(3) default CURRENT_TIMESTAMP not null,
    "requestBy"           integer                                not null,
    "accessAll"           boolean      default false             not null,
    "changedAt"           timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table "connectionRequest"
    owner to postgres;

create unique index "connectionRequest_userId_coachId_key"
    on "connectionRequest" ("userId", "coachId");

create unique index "emailUQ"
    on users (email);

create table schedules
(
    "scheduleId"   serial
        constraint "scheduleIdPK"
            primary key,
    "connectionId" integer                                not null
        references connections
            on update cascade on delete cascade,
    date           timestamp(3)                           not null,
    rate           integer,
    reply          text,
    "changedAt"    timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table schedules
    owner to postgres;

create table "mealSchedule"
(
    "mealScheduleId" serial
        constraint "mealScheduleIdPK"
            primary key,
    "mealId"         integer                                not null
        references meals
            on update cascade on delete cascade,
    "scheduleId"     integer                                not null
        references schedules
            on update cascade on delete cascade,
    "changedAt"      timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table "mealSchedule"
    owner to postgres;

create table "profileData"
(
    "profileId"        integer                                    not null
        constraint "profileIdPK"
            primary key,
    "userId"           integer                                    not null
        constraint "userIdFK"
            references users,
    "registrationDate" timestamp(6) default CURRENT_TIMESTAMP     not null,
    "firstName"        varchar(100) default ''::character varying not null,
    "birthDay"         date,
    "lastName"         varchar(200),
    height             double precision,
    male               boolean      default true                  not null,
    "profilePicPath"   text         default ''::text              not null,
    "changedAt"        timestamp(6) default CURRENT_TIMESTAMP     not null
);

alter table "profileData"
    owner to postgres;

create table "dayHistory"
(
    "dayId"     serial
        constraint "dayIdPK"
            primary key,
    "profileId" integer                                not null
        constraint "profileIdFK"
            references "profileData",
    date        date                                   not null,
    "changedAt" timestamp(6) default CURRENT_TIMESTAMP not null,
    comment     text
);

alter table "dayHistory"
    owner to postgres;

create table "weightHistory"
(
    "weightId"  serial
        constraint "weightIdPK"
            primary key,
    "dayId"     integer                                not null
        constraint "dayIdFK"
            references "dayHistory"
            on update cascade on delete cascade,
    weight      double precision                       not null,
    "changedAt" timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table "weightHistory"
    owner to postgres;

create unique index "weightHistory_dayId_key"
    on "weightHistory" ("dayId");

create table "mealHistory"
(
    "mealHistoryId" serial
        constraint "mealHistoryIdPK"
            primary key,
    "dayId"         integer                                not null
        references "dayHistory"
            on update cascade on delete cascade,
    "mealId"        integer                                not null
        constraint "mealIdFK"
            references meals
            on update cascade on delete cascade,
    "periodName"    varchar(30)                            not null
        references "mealPeriods"
            on update cascade on delete restrict,
    "changedAt"     timestamp(6) default CURRENT_TIMESTAMP not null
);

alter table "mealHistory"
    owner to postgres;

create unique index "dayIdProfileIdUQ"
    on "dayHistory" (date, "profileId");

create unique index "profileData_userId_key"
    on "profileData" ("userId");

create table goals
(
    "goalId"              serial
        primary key,
    "profileId"           integer                                    not null
        references "profileData"
            on update cascade on delete restrict,
    "targetWeight"        double precision default 70                not null,
    "targetCalories"      double precision default 2000              not null,
    "carbohydratesPerDay" integer          default 50                not null,
    "proteinPerDay"       integer          default 30                not null,
    "fatPerDay"           integer          default 20                not null,
    "breakfastPerDay"     integer          default 30                not null,
    "lunchPerDay"         integer          default 40                not null,
    "dinnerPerDay"        integer          default 25                not null,
    "otherPerDay"         integer          default 5                 not null,
    date                  date             default CURRENT_TIMESTAMP not null
);

alter table goals
    owner to postgres;

create unique index "goals_profileId_key"
    on goals ("profileId");

create unique index "goals_profileId_date_key"
    on goals ("profileId", date);

