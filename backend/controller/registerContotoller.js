import registerModel from "../models/auth.js";
import bcrypt from "bcryptjs";
//signup
export const register = (req, res) => {
  registerModel
    .find({ email: req.body.email })
    .then((user) => {
      if (user.length > 0) {
        res.json("this email already exists");
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            registerModel
              .create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              })
              .then((result) => res.json(result))
              .catch((err) => res.json(err));
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
