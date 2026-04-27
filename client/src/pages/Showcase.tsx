import React from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import AddToCartCard from "../components/AddToCartCard";

// component showcase
const Showcase = () => {
  return (
    <main className="flex flex-col gap-4">
      {/* <Navbar /> */}
      {/* <ProductCard /> */}
      <AddToCartCard />
    </main>
  );
};

export default Showcase;
