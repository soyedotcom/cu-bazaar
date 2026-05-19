import type { Product } from "../data/products";

import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className=" h-74 w-41 flex flex-col">
      <section className="w-full h-37">
        <img
          className="h-full w-full object-cover object-center"
          src={product.image}
          alt={product.name}
        />
      </section>

      <section className=" w-full h-37 flex flex-col text-left mt-4">
        <div className="mb-1">{product.name}</div>
        <div className="font-bold mb-5">₦{product.price.toLocaleString()}</div>
        <div className="flex gap-2 align-middle">
          <button>
            <InfoIcon />
          </button>
          <button>
            <WishlistIcon />
          </button>
          <button>
            <CartIcon />
          </button>
        </div>
        <div className="mt-auto">
          <img src="/" alt="product rating" />
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
