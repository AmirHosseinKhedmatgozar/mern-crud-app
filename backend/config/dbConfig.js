import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amirhosein138134:13810424@cluster0.7mad5.mongodb.net/CRUD",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
