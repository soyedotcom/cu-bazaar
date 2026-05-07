import CheckoutBtn from "./CheckoutBtn";

const OrderSummary = () => {
  return (
    <section className="flex flex-col text-left">
      <h1 className="font-bold text-[24px]">Order Summary</h1>
      <div className="my-2.5">
        <p>5 items</p>
      </div>
      <div className="my-3">
        <p>Total Price: </p>
      </div>
      <div>
        <p className="font-bold text-[24px]">N10,000.00</p>
      </div>

      <div className="my-20">
        <CheckoutBtn />
      </div>
    </section>
  );
};

export default OrderSummary;
