import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem } from "../context/CartContext";
import { useCart } from "../context/CartContext";

interface Props {
  cartItem: CartItem;
}

const CartProductCard = ({ cartItem }: Props) => {
  const { removeFromCart } = useCart();
  const { product, quantity } = cartItem;
  const [productQuantity, setProductQuantity] = useState(quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setProductQuantity(value);
  };

  return (
    <section className="flex flex-row h-39 w-130">
      <div>
        <img
          className="h-full w-39 object-center object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex-1 flex flex-col text-left ml-10">
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
            <CloseIcon
              className="hover:cursor-pointer"
              onClick={() => removeFromCart(cartItem.id)}
            />
          </div>
        </div>
        <div>
          <p className="font-bold">₦{Number(product.price).toLocaleString()}</p>
        </div>
        <div className="mt-auto text-right flex flex-row gap-2 p-2">
          <p>Quantity:</p>
          <input
            type="number"
            min="1"
            max="20"
            value={productQuantity}
            onChange={handleQuantityChange}
            className="outline-none appearance-none"
          />
        </div>
      </div>
    </section>
  );
};

export default CartProductCard;
