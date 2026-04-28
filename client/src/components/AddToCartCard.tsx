import { Link } from "react-router";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";
import LinkIcon from "@mui/icons-material/ArrowForward";

const AddToCartCard = () => {
  return (
    <main className="bg-[#00000017] w-[100vh - 5] h-screen z-50">
      <section className="bg-green-200 flex flex-row w-200 h-100 rounded-xl p-4">
        <section className="bg-blue-300 flex-1 rounded-l-xl">
          <img
            className="rounded-xl h-full w-full"
            src=""
            alt="product image"
          />
        </section>

        <section className="bg-pink-300 flex-1 rounded-r-xl text-left pl-5">
          <section className="mb-5">
            <p className="font-bold">Product Name</p>
            <p>
              Sold by <span className="font-bold">Product Vendor</span>
            </p>
          </section>

          <section>
            <p className="font-bold">Product Price</p>
            <img src="" alt="Product Rating" />
          </section>

          <div className="flex-1">Procuct Specifications</div>

          <section>
            <div className="flex items-center">
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
