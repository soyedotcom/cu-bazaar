import WishlistProductCard from "../components/WishlistProductCard";
import { wishlist } from "../data/wishlist";

const Wishlist = () => {
  return (
    <main className="flex flex-col mx-25 my-15">
      <section className="flex-1 flex flex-col gap-10">
        <h1 className="text-left text-[24px] font-bold">
          Wishlist ({wishlist.length})
        </h1>

        {wishlist.map((wishlistItem) => {
          return (
            <WishlistProductCard
              key={wishlistItem.product.id}
              wishListItem={wishlistItem}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Wishlist;
