import AddToCartBtn from "./AddToCartBtn";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";

import { Link } from "react-router-dom";
import type { WishlistItem } from "../context/WishlistContext";
import { useWishlist } from "../context/WishlistContext";

interface Props {
  wishlistItem: WishlistItem;
}

const WishlistProductCard = ({ wishlistItem }: Props) => {
  const { product } = wishlistItem;
  const { removeFromWishlist } = useWishlist();

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

            <button
              className="cursor-pointer"
              onClick={() => removeFromWishlist(wishlistItem.id)}
            >
              <WishlistIcon />
            </button>
          </div>
        </div>
        <div>
          <p className="font-bold">₦{Number(product.price).toLocaleString()}</p>
        </div>
        <div className="mt-auto text-right">
          <AddToCartBtn product={product} />
        </div>
      </div>
    </section>
  );
};

export default WishlistProductCard;
