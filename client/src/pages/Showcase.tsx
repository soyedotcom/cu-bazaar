import NavBarSearch from "../components/NavBarSearch";
import OrderSummary from "../components/OrderSummary";

// component showcase
const Showcase = () => {
  return (
    <main className="flex flex-col gap-4">
      <NavBarSearch />
      <OrderSummary/>
    </main>
  );
};

export default Showcase;
