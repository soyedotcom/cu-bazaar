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
  quantity,
  selectedColor,
  selectedSize,
}: Props) => {
  const { addToCart } = useCart();

  return (
    <button
      className="bg-purple-400 border-none rounded-full h-10.5 w-52 font-bold hover:cursor-pointer"
      onClick={() =>
        addToCart({
          productId: product.id,
          quantity: quantity,
          selectedColor: selectedColor,
          selectedSize: selectedSize,
        })
      }
    >
      <CartIcon /> Add to Cart
    </button>
  );
};

export default AddToCartBtn;
