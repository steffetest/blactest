import express from "express";
import { register, login, getDriversLicense, getMe } from "../controllers/auth-controller.mjs";
import { protect } from "../middleware/authorization.mjs";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/getDriversLicense").get(protect, getDriversLicense);

export default router;
