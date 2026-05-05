import { Link } from "react-router-dom";
const CheckoutBtn = () => {
  return (
    <>
      <Link to="/">
        <button className="bg-purple-400 border-none rounded-full h-10.5 w-52 font-bold hover:cursor-pointer">
          <p>Checkout</p>
        </button>
      </Link>
    </>
  );
};

export default CheckoutBtn;
