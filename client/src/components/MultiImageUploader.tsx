import { useRef, useState } from "react";
import { api } from "../api/axios";
import CloseIcon from "@mui/icons-material/CloseRounded";

type Props = {
  images: string[];
  onChange: (urls: string[]) => void;
};

const MultiImageUploader = ({ images, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));

    try {
      const res = await api.post("/upload/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange([...images, ...res.data.data.urls]);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div key={i} className="relative">
            <img
              src={url}
              alt={`product-${i}`}
              className="h-20 w-20 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute -top-2 -right-2 bg-white rounded-full cursor-pointer"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="border-2 rounded-full h-10 px-5 cursor-pointer text-sm font-bold disabled:opacity-50 w-fit"
      >
        {uploading ? "Uploading..." : "+ Add Images"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
    </div>
  );
};

export default MultiImageUploader;
