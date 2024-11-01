import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/mongoDb.mjs";
import authRouter from "./routes/auth-routes.mjs"
import licenseRouter from "./routes/license-routes.mjs"
import verificationRouter from "./routes/verification-routes.mjs"
import notificationRouter from "./routes/notification-routes.mjs"
import { errorHandler } from "./middleware/errorHandler.mjs";

dotenv.config({path: "./config/config.env"});

connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/licenses", licenseRouter);
app.use("/api/v1/verify", verificationRouter);
app.use("/api/v1/notifications", notificationRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));