import { useState } from "react";
import { api } from "../api/axios";
import CloseIcon from "@mui/icons-material/CloseRounded";

type Props = {
  seller: { shopName: string; description?: string; logo?: string };
  onClose: () => void;
  onSuccess: () => void;
};

const EditShopCard = ({ seller, onClose, onSuccess }: Props) => {
  const [shopName, setShopName] = useState(seller.shopName);
  const [description, setDescription] = useState(seller.description ?? "");
  const [logo, setLogo] = useState(seller.logo ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.patch("/seller/dashboard", { shopName, description, logo });
      onSuccess();
    } catch (err) {
      console.log(err);
      setError("Failed to update shop");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border border-gray-400 rounded-full w-full px-4 py-2 h-12 outline-none";
  const labelClass = "font-bold py-2.5 pl-2 text-left";

  return (
    <main
      className="bg-[#d9d9d9af] fixed w-screen h-screen z-10 top-0 left-0 flex justify-center items-center"
      onClick={onClose}
    >
      <section
        className="bg-white relative z-20 rounded-xl p-8 w-140 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Edit Shop</h2>
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 items-center"
        >
          <div className="flex flex-col w-full">
            <label className={labelClass}>Shop Name</label>
            <input
              type="text"
              placeholder="Enter shop name"
              required
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Description</label>
            <textarea
              placeholder="Describe your shop"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="border border-gray-400 rounded-2xl w-full px-4 py-3 outline-none resize-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Logo URL</label>
            <input
              type="text"
              placeholder="Enter logo image URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="font-bold bg-purple-500 text-white h-12 w-full rounded-full cursor-pointer disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default EditShopCard;
