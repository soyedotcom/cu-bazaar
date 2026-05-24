import { Link } from "react-router-dom";
import { useState } from "react";
import VariantSelector from "./VariantSelector";

import LinkIcon from "@mui/icons-material/ArrowForward";
import AddToCartBtn from "./AddToCartBtn";
import QuantityAdjuster from "./QuantityAdjuster";
import WishlistBtn from "./WishlistBtn";

type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  features?: string[];
  measurements?: string;
  materialsandcare?: string;

  price: number;
  seller: {
    shopName: string;
  };

  variants?: {
    colors?: string[];
    sizes?: string[];
  };

  category: string;
  subcategory: string;
  section: string;
  tags?: string[];
};

type Props = {
  product: Product;
  onClose: () => void;
};

const AddToCartCard = ({ product, onClose }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <main
      className="bg-[#d9d9d9af] fixed w-screen h-screen z-10 top-0 right-0 left-0 bottom-0 flex justify-center items-center"
      onClick={onClose}
    >
      <section
        className="bg-white relative z-20 flex flex-row w-185 h-100 rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
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
                className="font-bold cursor-pointer hover:underline hover: hover:text-purple-500"
                to="/shop/:shopName"
              >
                {product.seller.shopName}
              </Link>
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <p className="font-bold text-[32px]">
              ₦{product.price.toLocaleString()}
            </p>
            <img src="/" alt="Product Rating" />
          </section>

          <div className="grow mt-4">
            <div className="flex flex-col gap-4">
              {product.variants?.sizes && (
                <VariantSelector
                  label="Size"
                  options={product.variants.sizes}
                  value={selectedSize}
                  onChange={setSelectedSize}
                />
              )}

              {product.variants?.colors && (
                <VariantSelector
                  label="Color"
                  options={product.variants.colors}
                  value={selectedColor}
                  onChange={setSelectedColor}
                />
              )}
            </div>

            <div className="mb-3">
              <QuantityAdjuster quantity={quantity} onChange={setQuantity} />
            </div>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <AddToCartBtn
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
              />

              <WishlistBtn productId={product.id} />
            </div>

            <Link to={`/product/${product.id}`}>
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
