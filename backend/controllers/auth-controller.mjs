import { asyncHandler } from "../middleware/asyncHandler.mjs";
import DriverLicense from "../models/DriverLicenseSchema.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs";
import User from "../models/UserSchema.mjs";

export const register = asyncHandler(async (req, res, next) => {
  const {name, email, password} = req.body;

  const user = await User.create({name, email, password});

  createAndSendToken(user, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  const user = await User.findOne({email}).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid email/password", 401));
  }

  const correctPassword = await user.validatePassword(password);

  if (!correctPassword) {
    return next(new ErrorResponse("Invalid email/password", 401));
  }
  
  createAndSendToken(user, 200, res);
});

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({success: true, statusCode: 200, data: user})
});

const createAndSendToken = (user, statusCode, res) => {
  const token = user.generateToken();

  res.status(statusCode).json({success: true, statusCode, token});
};

export const getDriversLicense = asyncHandler(async (req, res, next) => {
  const license = await DriverLicense.findOne({ user: req.user.id });

  if (!license) {
    return res.status(404).json({
      success: false,
      message: "No driver's license has been added"
    });
  }

  res.status(200).json({
    success: true,
    data: license
  });
});
