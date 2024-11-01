import jwt from "jsonwebtoken";
import User from "../models/UserSchema.mjs";
import { asyncHandler } from "./asyncHandler.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    next(new ErrorResponse("Not authorized, you need to log in!", 401));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);

  if (!req.user) {
    next(new ErrorResponse("No user found with this ID", 401));
  }

  next();
});