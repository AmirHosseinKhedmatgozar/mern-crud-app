import mongoose from "mongoose";

const authSchemea = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    admin: { type: Number, default: 1000 },
    user: Number,
    editor: Number,
  },
  refreshToken: [String],
});
const authModel = mongoose.model("registers", authSchemea);

export default authModel;
