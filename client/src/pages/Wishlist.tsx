import WishlistProductCard from "../components/WishlistProductCard";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, loading } = useWishlist();

  if (loading) return <p>Loading...</p>;
  return (
    <main className="flex flex-col mx-25 my-15">
      <section className="flex-1 flex flex-col gap-10">
        <h1 className="text-left text-[24px] font-bold">
          Wishlist ({wishlist.length})
        </h1>

        {wishlist.length === 0 && <p>Your wishlist is empty.</p>}

        {wishlist.map((wishlistItem) => (
          <WishlistProductCard
            key={wishlistItem.id}
            wishlistItem={wishlistItem}
          />
        ))}
      </section>
    </main>
  );
};

export default Wishlist;
