import express from "express";
import { addDriversLicense } from "../controllers/license-controller.mjs";
import { protect } from "../middleware/authorization.mjs";

const router = express.Router();

router.route("/addDriversLicense").post(protect, addDriversLicense);

export default router;