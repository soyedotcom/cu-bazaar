import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Hello");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post("http://localhost:3030/register", { name, email, password })
  //     .then((result) => {
  //       console.log(result);
  //       navigate("/login");
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
        <h1 className="text-4xl font-bold mb-2">Create Your Bazaar Account!</h1>

        <div className="flex flex-col gap-7 my-5">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="font-bold py-2.5 pl-2 text-left"
            >
              Name:
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border border-gray-400 rounded-full px-4 py-2 h-12"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold my-2 text-left pl-2">
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
            <label
              htmlFor="password"
              className="font-bold py-2.5 pl-2 text-left"
            >
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
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmpassword"
              className="font-bold py-2.5 pl-2 text-left"
            >
              Confirm Password:
            </label>

            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Enter password again"
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="border border-gray-400 rounded-full px-4 py-2 h-12"
            />
          </div>
        </div>

        <button
          type="submit"
          className="font-bold my-4 bg-purple-400 text-white p-2 h-12 w-full rounded-full cursor-pointer"
        >
          Start Shopping
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <span>
          <Link to="/signin" className="cursor-pointer hover:text-purple-600">
            Sign In
          </Link>
        </span>
      </p>
    </div>
  );
};

export default SignUpForm;
