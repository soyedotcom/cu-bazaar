import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

import AddToCartCard from "./AddToCartCard";
import WishlistBtn from "./WishlistBtn";
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
          <div className="font-bold ">
            ₦{Number(product.price).toLocaleString()}
          </div>

          <div className="flex gap-2 align-middle mt-auto">
            <Link to={`/product/${product.id}`} className="cursor-pointer">
              <InfoIcon />
            </Link>

            <WishlistBtn productId={product.id} />

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
