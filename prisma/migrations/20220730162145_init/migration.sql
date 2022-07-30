-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SUPERADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('EMAIL', 'GOOGLE', 'FACEBOOK', 'APPLE');

-- CreateEnum
CREATE TYPE "RestaurantStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReviewRating" AS ENUM ('SUGGEST', 'NORMAL', 'BAD');

-- CreateEnum
CREATE TYPE "ImageRef" AS ENUM ('RESTAURANT', 'USER', 'REVIEW', 'MENU');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userType" "UserType" NOT NULL,
    "role" "Role" NOT NULL,
    "oauthId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuisine" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "geoId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "pricePerPerson" TEXT NOT NULL,
    "website" TEXT NOT NULL DEFAULT '',
    "businessHoursId" INTEGER NOT NULL,
    "breakTime" TEXT[],
    "phone" TEXT NOT NULL,
    "cuisineId" INTEGER NOT NULL,
    "status" "RestaurantStatus" NOT NULL DEFAULT 'PENDING',
    "view" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geo" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Geo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businessHours" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "monday" TEXT[],
    "tuesday" TEXT[],
    "wednesday" TEXT[],
    "thursday" TEXT[],
    "friday" TEXT[],
    "saturday" TEXT[],
    "sunday" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businessHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reviewId" INTEGER,
    "reviewRating" "ReviewRating" NOT NULL DEFAULT 'SUGGEST',
    "suggestFoodId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewLike" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "ref" "ImageRef" NOT NULL,
    "mimeType" TEXT,
    "originSize" TEXT[],
    "filename" TEXT,
    "url" TEXT NOT NULL,
    "reviewId" INTEGER,
    "restaurantId" INTEGER,
    "userId" INTEGER,
    "menuId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuggestFood" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuggestFood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantTag" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestarauntPrize" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestarauntPrize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueId_key" ON "User"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Cuisine_uniqueId_key" ON "Cuisine"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_uniqueId_key" ON "Restaurant"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_geoId_key" ON "Restaurant"("geoId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_businessHoursId_key" ON "Restaurant"("businessHoursId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_cuisineId_key" ON "Restaurant"("cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "Geo_uniqueId_key" ON "Geo"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "businessHours_uniqueId_key" ON "businessHours"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_uniqueId_key" ON "Favorite"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_uniqueId_key" ON "Review"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewLike_uniqueId_key" ON "ReviewLike"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_uniqueId_key" ON "Image"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "Image"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_uniqueId_key" ON "Menu"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "SuggestFood_uniqueId_key" ON "SuggestFood"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantTag_uniqueId_key" ON "RestaurantTag"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchHistory_uniqueId_key" ON "SearchHistory"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "RestarauntPrize_uniqueId_key" ON "RestarauntPrize"("uniqueId");

-- AddForeignKey
ALTER TABLE "Cuisine" ADD CONSTRAINT "Cuisine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_geoId_fkey" FOREIGN KEY ("geoId") REFERENCES "Geo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_businessHoursId_fkey" FOREIGN KEY ("businessHoursId") REFERENCES "businessHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_suggestFoodId_fkey" FOREIGN KEY ("suggestFoodId") REFERENCES "SuggestFood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewLike" ADD CONSTRAINT "ReviewLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewLike" ADD CONSTRAINT "ReviewLike_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantTag" ADD CONSTRAINT "RestaurantTag_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
