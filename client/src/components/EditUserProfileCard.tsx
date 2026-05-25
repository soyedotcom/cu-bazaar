import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axios";
import CloseIcon from "@mui/icons-material/CloseRounded";

import ImageUploader from "./ImageUploader";

type Props = { onClose: () => void };

const EditUserProfileCard = ({ onClose }: Props) => {
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name);
  const [hall, setHall] = useState(user?.hall);
  const [room, setRoom] = useState(user?.room);
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.patch(`/profile/${user.id}`, {
        name,
        avatar,
        hall,
        room,
        ...(password ? { password } : {}),
      });
      setSuccess("Profile updated successfully");

      await refreshUser();
      onClose();
    } catch {
      setError("Failed to update profile");
    }
  };

  const input =
    "border border-gray-400 rounded-full w-full px-4 py-2 h-12 outline-none";
  const labelClass = "font-bold py-2 pl-2 text-left  ";

  return (
    <div
      className="bg-[#d9d9d9af] fixed w-screen h-screen z-10 top-0 left-0 flex justify-center items-center"
      onClick={onClose}
    >
      <section
        className="bg-white relative z-20 rounded-xl p-8 w-140 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[24px]">Edit Profile</h2>
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className={labelClass}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className={input}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Profile Picture</label>
            <ImageUploader
              onUpload={setAvatar}
              preview={avatar}
              label="Upload Photo"
            />
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>Hall of Residence</label>
            <input
              type="text"
              value={hall}
              onChange={(e) => setHall(e.target.value)}
              placeholder="Enter hall"
              className={input}
            />
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>Room Number</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room number"
              className={input}
            />
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className={input}
            />
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={input}
            />
          </div>

          {error && <p className="text-red-500  ">{error}</p>}
          {success && <p className="text-green-500  ">{success}</p>}

          <button
            type="submit"
            className="bg-purple-500 text-white font-bold rounded-full h-12 w-full cursor-pointer mt-2"
          >
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditUserProfileCard;
