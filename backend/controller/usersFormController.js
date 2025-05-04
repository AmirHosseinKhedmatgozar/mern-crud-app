import userModel from "../models/usersForm.js";

export const getUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

export const getUser = (req, res) => {
  userModel
    .find({ _id: req.params.id })
    .then((user) => {
      console.log(req.params.ird);
      res.json(user);
    })
    .catch((err) => res.json(err));
};

export const createUser = (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then(() => res.json({ id, ...req.body }))
    .catch((err) => res.json(err));
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
