import authModel from "../models/auth.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await authModel.find().exec();
    if (!users) return res.status(204).json({ message: "Users  not found" });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default getAllUsers;
