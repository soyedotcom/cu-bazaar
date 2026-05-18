import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3030/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/home");
        } else {
          alert(`Error: ${result.data}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center p-5 justify-center h-screen">
      <form
        action="/signup"
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-5 rounded-xl w-100 m-4"
      >
        <h2 className="text-3xl font-semibold mb-2">Welcome back!</h2>

        <label htmlFor="email" className="font-semibold my-2">
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
          className="border border-gray-400 rounded-xs px-4 py-2"
        />

        <label htmlFor="password" className="font-semibold my-2">
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
          className="border border-gray-400 rounded-xs px-4 py-2"
        />

        <button
          type="submit"
          className="font-semibold my-4 bg-purple-400 text-white p-2 rounded-s cursor-pointer"
        >
          Log In
        </button>
      </form>

      <p>Don't have an account?</p>

      <Link
        to="/signup"
        className="font-semibold my-2 border-gray-500 border p-2 rounded-xs text-center cursor-pointer"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignInForm;
