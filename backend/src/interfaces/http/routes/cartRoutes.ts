import express from "express";
import { cartController } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", cartController.get);
router.post("/", cartController.add);
router.patch("/", cartController.update);

export default router;
