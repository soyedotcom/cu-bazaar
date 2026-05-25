import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import EditUserProfileCard from "../components/EditUserProfileCard";

type ActiveSection = "orders" | "transactions" | "active" | null;

const UserProfile = () => {
  const { user, signout } = useAuth();
  const [showCard, setShowCard] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("active");

  if (!user) return null;
  const createdAt = user.createdAt;

  return (
    <main className="flex flex-col mx-25 my-10">
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[45px]">Hello, {user.name}</h1>
            <div className="flex gap-5">
              <button
                className="border-2 rounded-full h-10 w-30 cursor-pointer"
                onClick={() => setShowCard(true)}
              >
                Edit Profile
              </button>
              <button
                className="bg-red-500 text-white rounded-full h-10 w-30 cursor-pointer"
                onClick={signout}
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="text-left flex flex-col gap-2">
            <p className="font-bold">
              {user.hall} {user.room}
            </p>

            <p>{user.email}</p>

            <p className="text-gray-500  ">
              Member since:{" "}
              {new Date(createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <p className="text-left">
            {user.isSeller ? (
              <Link
                to={`/seller/dashboard`}
                className="font-bold hover:text-purple-500 hover:underline"
              >
                Go To Shop Profile
              </Link>
            ) : (
              <>
                Own a business?{" "}
                <Link
                  to="/become-a-seller"
                  className="font-bold hover:text-purple-500 hover:underline"
                >
                  Start selling
                </Link>
              </>
            )}
          </p>

          <div className="flex gap-5">
            {(["active", "orders", "transactions"] as ActiveSection[]).map(
              (s) => (
                <button
                  key={s}
                  onClick={() =>
                    setActiveSection(activeSection === s ? null : s)
                  }
                  className={`border-2 rounded-full h-10 px-5 cursor-pointer transition-all ${
                    activeSection === s ? "bg-black text-white" : ""
                  }`}
                >
                  {s === "orders"
                    ? "Order History"
                    : s === "transactions"
                      ? "Transaction History"
                      : "Active Orders"}
                </button>
              ),
            )}
          </div>

          <div className="text-center flex-col justify-center mt-10">
            {activeSection === "orders" && (
              <p className="text-gray-500">No past orders.</p>
            )}
            {activeSection === "transactions" && (
              <p className="text-gray-500">No transactions yet.</p>
            )}
            {activeSection === "active" && (
              <p className="text-gray-500">No active orders.</p>
            )}
          </div>
        </section>
      </div>

      {showCard && <EditUserProfileCard onClose={() => setShowCard(false)} />}
    </main>
  );
};

export default UserProfile;
