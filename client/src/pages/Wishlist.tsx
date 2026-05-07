import WishlistProductCard from "../components/WishlistProductCard";

const Wishlist = () => {
  return (
    <main className="flex flex-col mx-25 my-15">
      <section className="flex-1 flex flex-col gap-10">
        <h1 className="text-left text-[24px] font-bold">Wishlist (3)</h1>
        <WishlistProductCard />
        <WishlistProductCard />
        <WishlistProductCard />
      </section>
    </main>
  );
};

export default Wishlist;
