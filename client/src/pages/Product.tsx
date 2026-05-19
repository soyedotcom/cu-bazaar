import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { products } from "../data/products";
import type { Product } from "../data/products";

import AddToCartBtn from "../components/AddToCartBtn";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import BackIcon from "@mui/icons-material/ArrowBackRounded";
import DropDownActive from "@mui/icons-material/KeyboardArrowDownRounded";
import DropDownInactive from "@mui/icons-material/KeyboardArrowRightRounded";

const Product = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMeasurementsOpen, setIsMeasurementsOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = products.find(
    (p) => p.id === Number(id),
  );

  if (!product) {
    throw new Error("Product Not Found");
  }

  return (
    <main className="flex flex-col mx-25 my-10 text-left">
      <nav>
        <Link to="/shop" className="cursor-pointer font-bold ">
          <BackIcon /> Back To Shop
        </Link>
      </nav>

      <section className="flex flex-row w-full my-5">
        <section>
          <div className="flex flex-col gap-5 w-80">
            <div className="h-80 w-80">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full rounded-md object-cover object-center"
              />
            </div>

            <div className="w-full flex justify-between align-middle h-15">
              <button className="w-15 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
              <button className="w-15 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
              <button className="w-15 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
              <button className="w-15 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col pl-10 flex-1 max-w-170">
          <div className="flex flex-col gap-2.5">
            <h1 className="font-semibold text-[24px]">{product.name}</h1>

            <p>{product.description}</p>

            <p>
              Sold by{" "}
              <span className="font-semibold hover:text-purple-500">
                <Link to="/">{product.seller}</Link>
              </span>
            </p>

            <p className="font-bold text-[32px] py-3">
              ₦{product.price.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-5 align-middle mt-auto">
            <AddToCartBtn />

            <button className="cursor-pointer">
              <WishlistIcon />
            </button>
          </div>
        </section>

        <section className="flex flex-col flex-end w-85">
          <h2 className="text-[24px] font-semibold">Product Information</h2>

          <div className="flex flex-col gap-5 my-5">
            <section className="flex flex-col gap-1">
              <div className="font-semibold flex align-middle">
                <p>Features </p>
                <span>
                  <button
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                    className="cursor-pointer"
                  >
                    {isFeaturesOpen ? <DropDownActive /> : <DropDownInactive />}
                  </button>
                </span>
              </div>

              {isFeaturesOpen && (
                <div>
                  <p>feature description to be inputed by user</p>
                </div>
              )}
            </section>

            <section className="flex flex-col gap-1">
              <div className="font-semibold flex align-middle">
                <p>Measurements </p>
                <span>
                  <button
                    onClick={() => setIsMeasurementsOpen(!isMeasurementsOpen)}
                    className="cursor-pointer"
                  >
                    {isMeasurementsOpen ? (
                      <DropDownActive />
                    ) : (
                      <DropDownInactive />
                    )}
                  </button>
                </span>
              </div>

              {isMeasurementsOpen && (
                <div>
                  <p>feature description to be inputed by user</p>
                </div>
              )}
            </section>

            <section className="flex flex-col gap-1">
              <div className="font-semibold flex align-middle">
                <p>Materials and Care </p>
                <span>
                  <button
                    onClick={() => setIsMaterialsOpen(!isMaterialsOpen)}
                    className="cursor-pointer"
                  >
                    {isMaterialsOpen ? (
                      <DropDownActive />
                    ) : (
                      <DropDownInactive />
                    )}
                  </button>
                </span>
              </div>

              {isMaterialsOpen && (
                <div>
                  <p>
                    Made with cotton and polyester. Hand wash with cold water
                    and soap.
                  </p>
                </div>
              )}
            </section>
          </div>

          <section>Product Rating</section>
        </section>
      </section>
    </main>
  );
};

export default Product;
