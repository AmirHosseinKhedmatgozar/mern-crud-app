import express from "express";
import verifyRoles from "../middleware/verifyRoles.js";
import getAllUsers from "../controller/usersController.js";
import { ROLES_LIST } from "../config/rolesList.js";

const usersRoutes = express.Router();

usersRoutes.get("/", verifyRoles(ROLES_LIST.Admin), getAllUsers);

export default usersRoutes;
