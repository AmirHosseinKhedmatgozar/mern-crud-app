import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authModel from "../models/auth.js";
import dotenv from "dotenv";
dotenv.config();
//signin
const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const foundUser = await authModel.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const roles = Object.values(foundUser.role).filter(Boolean);

  const accessToken = jwt.sign(
    {
      userInfo: { name: foundUser.name, roles: foundUser.role },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );

  const nweRefreshToken = jwt.sign(
    {
      name: foundUser.name,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  let newRefreshTokenArray = !cookies?.jwt
    ? foundUser.refreshToken
    : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

  if (cookies?.jwt) {
    const foundToken = await authModel
      .findOne({ refreshToken: cookies.jwt })
      .exec();

    if (!foundToken) {
      newRefreshTokenArray = [];
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  }

  foundUser.refreshToken = [
    ...new Set([...nweRefreshToken, ...newRefreshTokenArray]),
  ];

  await foundUser.save();

  res.cookie("jwt", nweRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json({ name: foundUser.name, roles, accessToken });
};

export default handleLogin;
