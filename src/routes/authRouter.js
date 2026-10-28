import { Router } from "express";

import { auth } from "../middleware/auth.js";

import {
  signup,
  signin,
  onramp,
  getProfile,
  getTransactions,
} from "../controller/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/onramp", auth, onramp);
router.get("/profile", auth, getProfile);
router.get("/transactions", auth, getTransactions);

export default router;
