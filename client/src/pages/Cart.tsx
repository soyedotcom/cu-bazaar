import OrderSummary from "../components/OrderSummary";
import CartProductCard from "../components/CartProductCard";
import { cart } from "../data/cart";

const Cart = () => {
  return (
    <main className="flex flex-col mx-25 my-15">
      <div className="flex flex-row">
        <section className="flex-1 flex flex-col gap-10">
          <h1 className="text-left text-[24px] font-bold">
            Cart ({cart.length})
          </h1>

          {cart.map((cartItem) => {
            return (
              <CartProductCard key={cartItem.product.id} cartItem={cartItem} />
            );
          })}
        </section>
        <section>
          <OrderSummary />
        </section>
      </div>
    </main>
  );
};

export default Cart;
