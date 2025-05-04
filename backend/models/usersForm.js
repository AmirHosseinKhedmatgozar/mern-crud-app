import mongoose from "mongoose";

const usersFormSchema = new mongoose.Schema({
  // username: {type: String, required: true},
  name: String,
  email: String,
  age: Number,
});

const usersFormModel = mongoose.model("users", usersFormSchema);
export default usersFormModel;
