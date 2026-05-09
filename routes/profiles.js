import express from "express";

import { authorizeRoles } from "../middleware/auth.js";
import {
  createProfile,
  getAllProfiles,
  getProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", getProfile);
router.post("/", createProfile);

router.get("/", authorizeRoles("owner", "admin"), getAllProfiles);

export default router;
