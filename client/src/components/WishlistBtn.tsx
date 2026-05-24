import { useWishlist } from "../context/WishlistContext";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import WishlistFilledIcon from "@mui/icons-material/FavoriteRounded";

type Props = { productId: string };

const WishlistBtn = ({ productId }: Props) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const wishlistItem = wishlist.find((item) => item.productId === productId);
  const inWishlist = !!wishlistItem;

  const handleClick = async () => {
    if (inWishlist) {
      await removeFromWishlist(wishlistItem.id);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer transition-all
        duration-200 ${inWishlist ? "text-rose-600" : "text-inherit"}`}
    >
      {inWishlist ? <WishlistFilledIcon /> : <WishlistIcon />}
    </button>
  );
};

export default WishlistBtn;
