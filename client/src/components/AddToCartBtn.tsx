import { useCart } from "../context/CartContext";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  selectedColor?: string | null;
  selectedSize?: string | null;
};

const AddToCartBtn = ({ product, selectedColor, selectedSize }: Props) => {
  const { addToCart } = useCart;

  return (
    <button
      className="bg-purple-400 border-none rounded-full h-10.5 w-52 font-bold hover:cursor-pointer"
      onClick={() =>
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          color: selectedColor,
          size: selectedSize,
        })
      }
    >
      <CartIcon /> Add to Cart
    </button>
  );
};

export default AddToCartBtn;
