import AddToCartBtn from "./AddToCartBtn";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";

const WishlistProductCard = () => {
  return (
    <section className="flex flex-row h-39 w-115">
      <div>
        <img
          className="h-full w-39 object-center object-cover"
          src="glasses.jpg"
          alt="product image"
        />
      </div>
      <div className="flex-1 flex flex-col text-left ml-5">
        <div className="flex justify-between mb-1">
          <div>Product Name</div>
          <div>
            <InfoIcon /> <WishlistIcon />
          </div>
        </div>
        <div>
          <p className="font-bold">Product Price</p>
        </div>
        <div className="mt-auto text-right">
          <AddToCartBtn />
        </div>
      </div>
    </section>
  );
};

export default WishlistProductCard;
