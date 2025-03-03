import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  role: { type: String, enum: ["resident", "admin"], default: "resident" }
}, { timestamps: true });

// Comparing the user password entered by user with the user saved password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

// Generating a JWT token when a user registers or logins
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);

export default User;