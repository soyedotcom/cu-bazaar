import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Hello");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post("http://localhost:3030/login", { email, password })
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data === "Success") {
  //         navigate("/home");
  //       } else {
  //         alert(`Error: ${result.data}`);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="flex flex-col items-center p-5 justify-center gap-5">
      <form
        action="/signup"
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col p-5 w-100"
      >
        <h1 className="text-4xl font-bold mb-5">Welcome back!</h1>

        <div className="flex flex-col gap-7 my-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold py-2.5 pl-2 text-left">
              Email:
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border border-gray-400 rounded-full px-4 py-2 h-12"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold my-2 text-left pl-2">
              Password:
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border border-gray-400 rounded-full px-4 py-2 h-12"
            />
            <Link
              to="/"
              className="text-left text-[14px] pl-2 mt-2 cursor-pointer hover:text-purple-600"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="font-bold my-4 bg-purple-400 text-white p-2 h-12 w-full rounded-full cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

        <p>
          Don't have an account yet?{" "}
          <span>
            <Link to="/signup" className="cursor-pointer hover:text-purple-600">
              Sign Up
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
