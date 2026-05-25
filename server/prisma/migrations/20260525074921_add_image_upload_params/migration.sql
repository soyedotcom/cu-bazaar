-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "SellerProfile" ADD COLUMN     "banner" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;

-- CreateIndex
CREATE INDEX "Product_published_idx" ON "Product"("published");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_subcategory_idx" ON "Product"("subcategory");

-- CreateIndex
CREATE INDEX "Product_section_idx" ON "Product"("section");
