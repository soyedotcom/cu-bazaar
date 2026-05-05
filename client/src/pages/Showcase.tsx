import NavBarSearch from "../components/NavBarSearch";
import WishlistProductCard from "../components/WishlistProductCard";

// component showcase
const Showcase = () => {
  return (
    <main className="flex flex-col gap-4">
      <NavBarSearch />

      <WishlistProductCard />
    </main>
  );
};

export default Showcase;
