import { Link } from "react-router-dom";
import { useState } from "react";

import AddToCartBtn from "../components/AddToCartBtn";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import BackIcon from "@mui/icons-material/ArrowBackRounded";
import DropDownActive from "@mui/icons-material/KeyboardArrowDownRounded";
import DropDownInactive from "@mui/icons-material/KeyboardArrowRightRounded";

const Product = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMeasurementsOpen, setIsMeasurementsOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);

  return (
    <main className="flex flex-col mx-25 my-15 text-left">
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
                src="watch.jpg"
                alt="product-image"
                className="h-full w-full rounded-md object-cover object-center"
              />
            </div>

            <div className="w-full flex justify-between align-middle h-15">
              <button className="w-15 cursor-pointer">
                <img
                  src="glasses.jpg"
                  alt="product-image"
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
              <button className="w-15 cursor-pointer">
                <img
                  src="shoe.jpg"
                  alt="product-image"
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
              <button className="w-15 cursor-pointer">
                <img
                  src="watch.jpg"
                  alt="product-image"
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
              <button className="w-15 cursor-pointer">
                <img
                  src="glasses.jpg"
                  alt="product-image"
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col pl-10 flex-1 max-w-170">
          <div className="flex flex-col gap-2.5">
            <h1 className="font-semibold text-[24px]">Product Name</h1>

            <p>Product description</p>

            <p>
              Sold by{" "}
              <span className="font-semibold hover:text-purple-500">
                <Link to="/">Sellers Name</Link>
              </span>
            </p>

            <p className="font-bold text-[32px] py-3">N12,000.00</p>
          </div>

          <div className="flex justify-between align-middle mt-auto">
            <AddToCartBtn />

            <button className="cursor-pointer">
              <WishlistIcon />
            </button>
          </div>
        </section>

        <section className="flex flex-col flex-end w-85">
          <h2 className="text-[24px] font-semibold">Product Information</h2>

          <div className="flex flex-col gap-5 my-5">
            <section>
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

            <section>
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

            <section>
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
                    Made with cotton and polyester. Hand wash with cold water and soap.
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
