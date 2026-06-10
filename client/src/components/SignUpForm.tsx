import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useAuth} from "../context/AuthContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hall, setHall] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({
        name,
        email,
        hall,
        room,
        password,
        confirmPassword,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 justify-center gap-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-5"
      >
        <h1 className="text-4xl font-bold mb-2">Create Your Bazaar Account!</h1>

        <div className="flex flex-col gap-7 my-5 items-center">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-bold py-2.5 pl-2 text-left">
              Name:
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border border-gray-400 rounded-full w-100 px-4 py-2 h-12"
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
              className="border border-gray-400 rounded-full w-100 px-4 py-2 h-12"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="hall" className="font-bold py-2.5 pl-2 text-left">
              Hall:
            </label>

            <input
              type="text"
              id="hall"
              name="hall"
              placeholder="Enter hall of residence"
              required
              onChange={(e) => {
                setHall(e.target.value);
              }}
              className="border border-gray-400 rounded-full w-100 px-4 py-2 h-12"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="room" className="font-bold py-2.5 pl-2 text-left">
              Room Number:
            </label>

            <input
              type="text"
              id="room"
              name="room"
              placeholder="Enter room number"
              required
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              className="border border-gray-400 rounded-full w-100 px-4 py-2 h-12"
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
              className="border border-gray-400 rounded-full w-100 px-4 py-2 h-12"
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
              className="border border-gray-400 rounded-full w-100 px-4 py-2 h-12"
            />
          </div>
          <button
            type="submit"
            className="font-bold my-4 bg-purple-400 text-white p-2 h-12 w-100 rounded-full cursor-pointer"
          >
            Start Shopping
          </button>
        </div>

        <p>
          Already have an account?{" "}
          <span>
            <Link to="/signin" className="cursor-pointer hover:text-purple-600">
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
