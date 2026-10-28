import { Router } from "express";

import { auth } from "../middleware/auth";
import { resolveMarket } from "../controller/resolve";

const router = Router();

router.use("/", auth, resolveMarket);

export default router;
