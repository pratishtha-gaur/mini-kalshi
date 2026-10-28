import { Router } from "express";

import { auth } from "../middleware/auth.js";
import {
  createMarket,
  getMarkets,
  placeBet,
  getBets,
} from "../controller/market.js";

const router = Router();

router.post("/", auth, createMarket);
router.get("/", getMarkets);

router.post("/bet", auth, placeBet);
router.get("/bets", auth, getBets);

export default router;
