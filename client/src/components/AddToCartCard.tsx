import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import LinkIcon from "@mui/icons-material/ArrowForward";
import AddToCartBtn from "./AddToCartBtn";

import { Link } from "react-router-dom";

const AddToCartCard = () => {
  return (
    <main className="bg-[#d9d9d9af] w-screen h-screen z-50 absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
      <section className="bg-white flex flex-row w-185 h-100 rounded-xl p-6">
        <section className="bg-blue-300 flex-1 rounded-xl">
          <img
            className="rounded-xl h-full w-full object-fill object-center"
            src="shoe.jpg"
            alt="product image"
          />
        </section>

        <section className="flex flex-col flex-1 rounded-r-xl text-left pl-10 h-full">
          <section className="mb-6 flex flex-col gap-2">
            <p className="font-bold text-[24px]">Product Name</p>
            <p>
              Sold by{" "}
              <Link
                className="font-bold hover:underline hover:cursor-pointer"
                to="/"
              >
                Product Vendor
              </Link>
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <p className="font-bold text-[32px]">Product Price</p>
            <img src="/" alt="Product Rating" />
          </section>

          <div className="grow mt-4">Procuct Specifications</div>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <AddToCartBtn />
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
