import { Link } from "react-router-dom";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";

const AddToCartBtn = () => {
  return (
    <div>
      <Link to="/shop">
        <button className="bg-purple-400 border-none rounded-full h-10.5 w-52 font-bold hover:cursor-pointer">
          <p>
            <CartIcon /> Add to Cart
          </p>
        </button>
      </Link>
    </div>
  );
};

export default AddToCartBtn;
