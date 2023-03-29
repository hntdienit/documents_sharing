import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "Bạn chưa đăng nhập!"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(createError(403, "Mã xác thực không chính xác!"));
    req.user = payload.sub;
    next();
  });
};