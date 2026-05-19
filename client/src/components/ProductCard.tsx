import { useState } from "react";
import type { Product } from "../data/products";

import AddToCartCard from "./AddToCartCard";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="h-78 max-h-78 w-41 max-w-41 flex flex-col">
      <section className="w-full h-37">
        <img
          className="h-full w-full object-cover object-center"
          src={product.image}
          alt={product.name}
        />
      </section>

      <section className="w-full h-37 flex flex-col text-left mt-4">
        <div className="flex flex-col">
          <div className="mb-1">
            {product.name.length > 31
              ? product.name.slice(0, 31) + "..."
              : product.name}
          </div>
        </div>

        <section className="flex flex-col gap-3 mt-auto">
          <div className="font-bold ">₦{product.price.toLocaleString()}</div>

          <div className="flex gap-2 align-middle mt-auto">
            <button className="cursor-pointer">
              <InfoIcon />
            </button>

            <button className="cursor-pointer">
              <WishlistIcon />
            </button>

            <button
              className="cursor-pointer"
              onClick={() => {
                setShowCard(true);
              }}
            >
              <CartIcon />
            </button>
          </div>

          <div className="mt-auto">
            <img src="/" alt="product rating" />
          </div>
        </section>
      </section>
      {showCard && (
        <AddToCartCard
          product={product}
          onClose={() => {
            setShowCard(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductCard;
