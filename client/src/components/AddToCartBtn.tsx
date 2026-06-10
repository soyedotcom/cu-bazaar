import { useCart } from "../context/CartContext";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity?: number;
  selectedColor?: string | null;
  selectedSize?: string | null;
  disabled: boolean;
};

const AddToCartBtn = ({
  product,
  quantity,
  selectedColor,
  selectedSize,
  disabled,
}: Props) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItem = cart.find(
    (item) =>
      item.productId === product.id &&
      (item.selectedColor ?? null) === (selectedColor ?? null) &&
      (item.selectedSize ?? null) === (selectedSize ?? null),
  );

  const inCart = !!cartItem;

  const handleClick = async () => {
    if (inCart) {
      await removeFromCart(cartItem.id);
    } else {
      await addToCart({
        productId: product.id,
        quantity,
        selectedColor,
        selectedSize,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        h-10.5
        w-52
        rounded-full
        border-2
        border-purple-500
        font-bold
        cursor-pointer
        flex
        items-center
        justify-center
        gap-1.5
        transition-all
        duration-200
        ${!inCart ? "bg-purple-500" : "bg-transparent text-purple-500"}
  `}
    >
      <CartIcon /> {inCart ? "Added to Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCartBtn;
