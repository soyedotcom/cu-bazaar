import { Link } from "react-router-dom";
import Taskbar from "../components/taskbar";

const Home = () => {
  return (
    <div>
      <div>
        <Taskbar />
      </div>
      <h2>Welcome Back User!</h2>

      <div>
        <p>
          Create an account : <Link to="/sign-up">Sign Up</Link>
        </p>
        <p>
          Log back in : <Link to="/sign-in">Sign In</Link>
        </p>
        <p>
          Go to user profile : <Link to="/:id/profile">User</Link>
        </p>
        <p>
          Go to seller profile : <Link to="/:id/shop">Shop</Link>
        </p>
        <p>
          Go to product details : <Link to="/:id/details">Product</Link>
        </p>
        <p>
          Go to cart : <Link to="/:id/cart">Cart</Link>
        </p>
        <p>
          Back to home : <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
