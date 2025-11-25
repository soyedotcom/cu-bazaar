import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    matric: {
      type: String,
    },
    regno: {
      type: Number,
      required: [true, "Please enter your reg number"],
    },
    email: {
      type: String,
      required: [true, "Please enter your student email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    isSeller: {
      type: Bool,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
