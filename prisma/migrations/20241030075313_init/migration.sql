-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site" (
    "id" SERIAL NOT NULL,
    "fio" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achivenments" TEXT[],
    "fotos" TEXT[],
    "adminLogin" TEXT NOT NULL,
    "usersCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "site_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "site_id_key" ON "site"("id");

-- CreateIndex
CREATE UNIQUE INDEX "site_adminLogin_key" ON "site"("adminLogin");
