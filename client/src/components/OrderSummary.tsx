import CheckoutBtn from "./CheckoutBtn";
import { useCart } from "../context/CartContext";

const OrderSummary = () => {
  const { cart, loading } = useCart();

  if (loading) return <p>Loading...</p>;

  const cartPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  return (
    <section className="flex flex-col text-left">
      <h1 className="font-bold text-[24px]">Order Summary</h1>
      <div className="my-2.5">
        <p>{cart.length} items</p>
      </div>
      <div className="my-3">
        <p>Total Price: </p>
      </div>
      <div>
        <p className="font-bold text-[24px]">
          ₦{Number(cartPrice).toLocaleString()}
        </p>
      </div>

      <div className="my-20">
        <CheckoutBtn />
      </div>
    </section>
  );
};

export default OrderSummary;
