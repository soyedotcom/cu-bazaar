import { useState } from "react";
import { api } from "../api/axios";
import CloseIcon from "@mui/icons-material/CloseRounded";

type Product = { id: string; name: string; image: string };

type Props = {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
};

const DeleteConfirmCard = ({ product, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/seller/products/${product.id}`);
      onSuccess();
    } catch {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#d9d9d9af] fixed w-screen h-screen z-10 top-0 left-0 flex justify-center items-center"
      onClick={onClose}
    >
      <section
        className="bg-white relative z-20 rounded-xl p-8 w-110 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[24px]">Delete Product</h2>
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-16 w-16 object-cover rounded-lg"
          />
          <div className="text-left">
            <p className="font-bold">{product.name}</p>
            <p className="text-gray-500 text-sm">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="border-2 rounded-full h-12 flex-1 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white font-bold rounded-full h-12 flex-1 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeleteConfirmCard;
