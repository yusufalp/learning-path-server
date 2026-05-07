import express from "express";

import { authenticateToken } from "../middleware/auth.js";

import profileRoutes from "../routes/profiles.js";

const router = express.Router();

router.use(authenticateToken);

router.use("/profiles", profileRoutes);

export default router;
