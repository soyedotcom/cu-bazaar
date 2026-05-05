import NavBarSearch from "../components/NavBarSearch";
import CartProductCard from "../components/CartProductCard";

// component showcase
const Showcase = () => {
  return (
    <main className="flex flex-col gap-4">
      <NavBarSearch />
      <CartProductCard />
    </main>
  );
};

export default Showcase;
