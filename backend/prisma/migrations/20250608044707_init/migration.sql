-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('QUOTATION', 'PURCHASE_ORDER', 'INVOICE', 'RECEIPT', 'DELIVERY_NOTE');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bankAccount" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "type" "DocumentType" NOT NULL,
    "number" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "DocumentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentItem" ADD CONSTRAINT "DocumentItem_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
