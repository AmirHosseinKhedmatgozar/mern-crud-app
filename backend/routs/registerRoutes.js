import express from "express";
import { register } from "../controller/registerContotoller.js";

const registerRoutes = express.Router();

registerRoutes.post("/", register);

export default registerRoutes;
