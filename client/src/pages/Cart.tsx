import OrderSummary from "../components/OrderSummary";
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
  return (
    <main className="flex flex-col mx-25 my-15">
      <div className="flex flex-row">
        <section className="flex-1 flex flex-col gap-10">
          <h1 className="text-left text-[24px] font-bold">Cart (5)</h1>
          <CartProductCard />
          <CartProductCard />
          <CartProductCard />
          <CartProductCard />
          <CartProductCard />
        </section>
        <section>
          <OrderSummary />
        </section>
      </div>
    </main>
  );
};

export default Cart;
