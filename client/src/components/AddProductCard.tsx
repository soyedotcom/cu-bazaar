import { useState } from "react";
import { api } from "../api/axios";
import CloseIcon from "@mui/icons-material/CloseRounded";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const AddProductCard = ({ onClose, onSuccess }: Props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [section, setSection] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [materialsAndCare, setMaterialsAndCare] = useState("");
  const [features, setFeatures] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/seller/products", {
        name,
        image,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        subcategory,
        section,
        measurements,
        materialsAndCare,
        features: features ? features.split(",").map((f) => f.trim()) : [],
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        published,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      setError("Failed to add product");
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
        className="bg-white relative z-20 rounded-xl p-8 w-160 h-150 overflow-y-auto flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Add Product</h2>
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 items-center"
        >
          <div className="flex flex-col w-full">
            <label className={labelClass}>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Description</label>
            <textarea
              placeholder="Describe your product"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="border border-gray-400 rounded-2xl w-full px-4 py-3 outline-none resize-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Price (₦)</label>
            <input
              type="number"
              placeholder="Enter price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Stock</label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Category</label>
            <input
              type="text"
              placeholder="e.g. Products"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Subcategory</label>
            <input
              type="text"
              placeholder="e.g. Fashion"
              required
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Section</label>
            <input
              type="text"
              placeholder="e.g. Tops"
              required
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Measurements</label>
            <input
              type="text"
              placeholder="e.g. 30cm x 40cm"
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Materials & Care</label>
            <input
              type="text"
              placeholder="e.g. 100% cotton, hand wash"
              value={materialsAndCare}
              onChange={(e) => setMaterialsAndCare(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Features (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Waterproof, Lightweight"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. summer, casual"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3 w-full">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="cursor-pointer"
            />
            <label htmlFor="published" className="font-bold cursor-pointer">
              Publish product immediately
            </label>
          </div>

          {error && <p className="text-red-500  ">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="font-bold bg-purple-500 text-white h-12 w-full rounded-full cursor-pointer disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddProductCard;
