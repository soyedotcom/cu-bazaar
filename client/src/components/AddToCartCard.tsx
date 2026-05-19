import { Link } from "react-router-dom";
import type { Product } from "../data/products";

import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import LinkIcon from "@mui/icons-material/ArrowForward";
import AddToCartBtn from "./AddToCartBtn";

interface Props {
  product: Product;
  onClose: () => void;
}

const AddToCartCard = ({ product, onClose }: Props) => {
  return (
    <main
      className="bg-[#d9d9d9af] fixed w-screen h-screen z-50 top-0 right-0 left-0 bottom-0 flex justify-center items-center"
      onClick={onClose}
    >
      <section className="bg-white flex flex-row w-185 h-100 rounded-xl p-6">
        <section className="bg-blue-300 flex-1 rounded-xl">
          <img
            className="rounded-xl h-full w-full object-cover object-center"
            src={product.image}
            alt={product.name}
          />
        </section>

        <section className="flex flex-col flex-1 rounded-r-xl text-left pl-10 h-full">
          <section className="mb-6 flex flex-col gap-2">
            <p className="font-bold text-[24px]">{product.name}</p>
            <p>
              Sold by{" "}
              <Link
                className="font-bold hover:underline hover:cursor-pointer"
                to="/"
              >
                {product.seller}
              </Link>
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <p className="font-bold text-[32px]">
              ₦{product.price.toLocaleString()}
            </p>
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
