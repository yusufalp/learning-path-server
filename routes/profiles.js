import express from "express";

import { authorizeRoles } from "../middleware/auth.js";
import {
  getAllProfiles,
  getProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", authorizeRoles("owner", "admin"), getAllProfiles);
router.get("/:userId", getProfile);

export default router;
