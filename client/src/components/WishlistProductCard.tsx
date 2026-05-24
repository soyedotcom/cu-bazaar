import AddToCartBtn from "./AddToCartBtn";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";

import WishlistBtn from "./WishlistBtn";
import QuantityAdjuster from "./QuantityAdjuster";

import { Link } from "react-router-dom";
import { useState } from "react";
import type { WishlistItem } from "../context/WishlistContext";

interface Props {
  wishlistItem: WishlistItem;
}

const WishlistProductCard = ({ wishlistItem }: Props) => {
  const { product } = wishlistItem;

  const [quantity, setQuantity] = useState(1);

  return (
    <section className="flex flex-row h-39 w-120">
      <div>
        <img
          className="h-full w-39 object-center object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex-1 flex flex-col text-left ml-5">
        <div className="flex justify-between mb-1">
          <div>{product.name}</div>
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="hover:cursor-pointer"
            >
              <InfoIcon />
            </Link>

            <WishlistBtn productId={product.id} />
          </div>
        </div>
        <div>
          <p className="font-bold">₦{Number(product.price).toLocaleString()}</p>
        </div>
        <div className="mt-auto text-right">
          <div className="flex flex-row gap-5">
            <QuantityAdjuster quantity={quantity} onChange={setQuantity} />
            <AddToCartBtn product={product} quantity={quantity} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistProductCard;
