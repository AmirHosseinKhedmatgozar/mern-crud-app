import express from "express";
import handleLogin from "../controller/authContoroller.js";

const authRoutes = express.Router();

authRoutes.post("/", handleLogin);

export default authRoutes;
