-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('WISHLISTED', 'IN_CART', 'PURCHASED');

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'IN_CART';

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "paymentStatus" "ProductStatus" NOT NULL DEFAULT 'PURCHASED';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rating" INTEGER;

-- AlterTable
ALTER TABLE "WishlistItem" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'WISHLISTED';
