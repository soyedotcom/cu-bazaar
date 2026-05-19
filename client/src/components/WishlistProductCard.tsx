import AddToCartBtn from "./AddToCartBtn";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";

import { Link } from "react-router-dom";
import type { WishListItem } from "../data/wishlist";

interface Props {
  wishListItem: WishListItem;
}

const WishlistProductCard = ({ wishListItem }: Props) => {
  const { product } = wishListItem;

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

            <WishlistIcon className="hover:cursor-pointer" />
          </div>
        </div>
        <div>
          <p className="font-bold">₦{product.price.toLocaleString()}</p>
        </div>
        <div className="mt-auto text-right">
          <AddToCartBtn />
        </div>
      </div>
    </section>
  );
};

export default WishlistProductCard;
