import OrderSummary from "../components/OrderSummary";
import CartProductCard from "../components/CartProductCard";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, loading } = useCart();

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex flex-col mx-25 my-15">
      <div className="flex flex-row">
        <section className="flex-1 flex flex-col gap-10">
          <h1 className="text-left text-[24px] font-bold">
            Cart ({cart.length})
          </h1>

          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map((cartItem) => (
            <CartProductCard key={cartItem.id} cartItem={cartItem} />
          ))}
        </section>
        <section>
          <OrderSummary />
        </section>
      </div>
    </main>
  );
};

export default Cart;
