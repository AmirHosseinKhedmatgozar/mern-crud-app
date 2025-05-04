import express from "express";
import handleLogout from "../controller/logoutcontroller.js";

const logoutRoutes = express.Router();

logoutRoutes.get("/", handleLogout);

export default logoutRoutes;
