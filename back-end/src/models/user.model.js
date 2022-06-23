import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: { type: String },
    dateOfBirth: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    methods: {
      getPublickProfile() {
        const { password, _id, __v, ...user } = this._doc;
        return { id: _id, ...user };
      },
    },
  }
);

export const Users = mongoose.model("Users", userSchema);
