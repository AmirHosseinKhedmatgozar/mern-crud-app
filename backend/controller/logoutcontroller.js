import authModel from "../models/auth.js";

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(200);
  const refreshToken = cookies.jwt;
  const allUsers = await authModel.find().exec();

  const foundUser = allUsers.find(
    (user) =>
      Array.isArray(user.refreshToken) &&
      user.refreshToken.join("") === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(201); // Forbidden
  }

  const newRefreshTokenArray = foundUser?.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  foundUser.refreshToken = [...newRefreshTokenArray];
  await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(202); // No Content
};

export default handleLogout;
