import { Link } from "react-router-dom";

const Taskbar = () => {
  return (
    <div class="flex flex-row w-full justify-evenly pr-100 pl-100">
      <p>
        <Link to="/">CU BAZZAR</Link>
      </p>

      <p>
        <Link to="/sign-in">Sign In</Link>
      </p>
      <p>
        <Link to="/sign-up">Sign Up</Link>
      </p>
      <p>
        <Link to="/:id/cart">Cart</Link>
      </p>
    </div>
  );
};

export default Taskbar;
