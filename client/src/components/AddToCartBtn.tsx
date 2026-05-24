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
};

const AddToCartBtn = ({
  product,
  quantity = 1,
  selectedColor,
  selectedSize,
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
        ${!inCart ? "bg-purple-500 text-white" : "bg-transparent text-purple-500"}
  `}
    >
      <CartIcon /> {inCart ? "Added to Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCartBtn;
