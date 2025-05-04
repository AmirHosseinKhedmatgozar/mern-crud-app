import express from "express";
import handleRefreshToken from "../controller/refreshTokenController.js";

const refreshRoutes = express.Router();

refreshRoutes.get("/", handleRefreshToken);

export default refreshRoutes;
