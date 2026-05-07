import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import InfoIcon from "@mui/icons-material/InfoOutlineRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";

const CartProductCard = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value);
  };

  return (
    <section className="flex flex-row h-39 w-130">
      <div>
        <img
          className="h-full w-39 object-center object-cover"
          src="watch.jpg"
          alt="product image"
        />
      </div>
      <div className="flex-1 flex flex-col text-left ml-10">
        <div className="flex justify-between mb-1">
          <div>Product Name</div>
          <div className="flex gap-2">
            <InfoIcon className="hover:cursor-pointer" />
            <WishlistIcon className="hover:cursor-pointer" />
            <CloseIcon className="hover:cursor-pointer" />
          </div>
        </div>
        <div>
          <p className="font-bold">Product Price</p>
        </div>
        <div className="mt-auto text-right flex flex-row gap-2 p-2">
          <p>Quantity:</p>
          <input
            type="number"
            min="1"
            max="20"
            value={quantity}
            onChange={handleQuantityChange}
            className="outline-none appearance-none"
          />
        </div>
      </div>
    </section>
  );
};

export default CartProductCard;
