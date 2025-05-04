import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/usersFormController.js";

const usersFormRoutes = express.Router();

usersFormRoutes.get("/", getUsers);
usersFormRoutes.get("/getUser/:id", getUser);
usersFormRoutes.post("/createUser", createUser);
usersFormRoutes.patch("/updateUser/:id", updateUser);
usersFormRoutes.delete("/deleteUser/:id", deleteUser);

export default usersFormRoutes;
