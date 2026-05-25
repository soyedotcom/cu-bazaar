import { useRef, useState } from "react";
import { api } from "../api/axios";

type Props = {
  onUpload: (url: string) => void;
  label?: string;
  preview?: string;
};

const ImageUploader = ({
  onUpload,
  label = "Upload Image",
  preview,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(preview ?? "");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload/single", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload(res.data.data.url);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          className="h-32 w-32 object-cover rounded-lg"
        />
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="border-2 rounded-full h-10 px-5 cursor-pointer text-sm font-bold disabled:opacity-50"
      >
        {uploading ? "Uploading..." : label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
