import express from "express";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import corsOptions from "./config/corsOptions.js";
import authRoutes from "./routs/authRoutes.js";
import cookieParser from "cookie-parser";
import registerRoutes from "./routs/registerRoutes.js";
import verifyJWT from "./middleware/verifyJWT.js";
import usersRoutes from "./routs/users.js";
import logoutRoutes from "./routs/logout.js";
import refreshRoutes from "./routs/refresh.js";
import usersFormRoutes from "./routs/usersFormRoutes.js";
import credentials from "./middleware/credential.js";
const app = express();
connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.listen(3001, () => {
  {
    console.log("server is running");
  }
});

//public routes
app.use("/usersForm", usersFormRoutes);
app.use("/auth", authRoutes);
app.use("/register", registerRoutes);
app.use("/logout", logoutRoutes);
app.use("/refresh", refreshRoutes);

//protected routes
app.use(verifyJWT);
app.use("/users", usersRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use((err, req, res) => {
  res.status(500).send(err.message);
});
