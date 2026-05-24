import InfoIcon from "@mui/icons-material/InfoOutlineRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

import QuantityAdjuster from "./QuantityAdjuster";

import { Link } from "react-router-dom";
import type { CartItem } from "../context/CartContext";
import { useCart } from "../context/CartContext";

interface Props {
  cartItem: CartItem;
}

const CartProductCard = ({ cartItem }: Props) => {
  const { removeFromCart, updateCartItem } = useCart();
  const { product } = cartItem;

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
          <QuantityAdjuster
            quantity={cartItem.quantity}
            onChange={(qty) => updateCartItem(cartItem.id, qty)}
          />
        </div>
      </div>
    </section>
  );
};

export default CartProductCard;
