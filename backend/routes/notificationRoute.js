import express from "express";
import { getNotifications } from "../controllers/notificationController.js";
import authMiddleware from "../middleware/auth.js";

const notificationRoute = express.Router();

// protected route — no :userId param, we read userId from middleware
notificationRoute.get("/", authMiddleware, getNotifications);

export default notificationRoute;






/*import express from "express";
import { getNotifications } from "../controllers/notificationController.js";

const notificationRoute = express.Router();

// ✅ Call the controller function
notificationRoute.get("/:userId", getNotifications);

export default notificationRoute; */
