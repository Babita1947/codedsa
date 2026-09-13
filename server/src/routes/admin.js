import express from "express";
import { adminUserController } from "../controllers/admin.js";
import { adminauthMiddleware } from "../middleware/admin-auth.js";

const router = express.Router();

router.get("/users", adminauthMiddleware, adminUserController);

export default router;