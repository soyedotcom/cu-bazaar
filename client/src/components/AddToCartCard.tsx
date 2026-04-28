import { Link } from "react-router";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";
import LinkIcon from "@mui/icons-material/ArrowForward";

const AddToCartCard = () => {
  return (
    <main className="bg-[#00000017] w-screen h-screen z-50">
      <section className="bg-green-200 flex flex-row w-200 h-100 rounded-xl p-4">
        <section className="bg-blue-300 flex-1 rounded-l-xl">
          <img src="" alt="product image" />
        </section>

        <section className="bg-pink-300 flex-1 rounded-r-xl">
          <section>
            <p>Product Name</p>
            <p>Product Vendor</p>
          </section>

          <section>
            <p>Product Price</p>
            <img src="" alt="Product Rating" />
          </section>

          <div>Procuct Specifications</div>

          <section>
            <div className="flex">
              <div>
                <Link to="/shop">
                  <button className="bg-purple-400 border-none rounded-full h-12 w-60.75 hover:cursor-pointer">
                    <p>
                      <CartIcon /> Add to Cart
                    </p>
                  </button>
                </Link>
              </div>
              <div>
                <WishlistIcon />
              </div>
            </div>

            <Link to="/">
              More details
              <LinkIcon />
            </Link>
          </section>
        </section>
      </section>
    </main>
  );
};

export default AddToCartCard;
