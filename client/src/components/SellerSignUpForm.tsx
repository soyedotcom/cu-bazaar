import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axios";

const SellerSignUpForm = () => {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/seller/become-a-seller", { shopName, description });
      await refreshUser();
      navigate(`/seller/dashboard`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to create seller profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "border border-gray-400 rounded-full px-4 py-2 h-12";
  const labelClass = "font-bold py-2 pl-2 text-left";

  return (
    <div className="flex flex-col items-center p-5 justify-center gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-120">
        <div className="flex flex-col gap-5 font-bold">
          <h1 className="font-bold text-4xl">Become a Seller</h1>
          <p>Set up your shop on CU Bazaar</p>
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Enter your shop name"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell buyers about your shop"
            rows={4}
            className="border border-gray-400 rounded-xl w-full px-4 py-3 outline-none resize-none"
          />
        </div>

        {error && <p className="text-red-500  ">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-500 text-white font-bold rounded-full h-12 w-full cursor-pointer disabled:opacity-50"
        >
          {loading ? "Creating Your Shop..." : "Start Selling"}
        </button>
      </form>
    </div>
  );
};

export default SellerSignUpForm;
