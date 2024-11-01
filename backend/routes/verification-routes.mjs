import express from "express";
import { approveLicenseVerification, declineLicenseVerification, verifyDriverLicense } from "../controllers/verification-controller.mjs";

const router = express.Router();

router.route("/").post(verifyDriverLicense);
router.route("/approve/:requestId").post(approveLicenseVerification);
router.route("/decline/:requestId").post(declineLicenseVerification);

export default router;