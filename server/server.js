import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userModel from "./models/users.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://amirhosein138134:13810424@cluster0.7mad5.mongodb.net/CRUD"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("error in connecting to database");
  });

app.get("/", (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  userModel
    .find({ _id: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.patch("/updateUser", (req, res) => {
  const { userId, ...updateData } = req.body;
  userModel
    .findByIdAndUpdate(userId, updateData)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  {
    console.log("server is running");
  }
});
