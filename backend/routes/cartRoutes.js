import express from "express";
import {
    addToCart,
    removeFromCart, 
    updateCartItem,
    getCart,
} from "../controllers/cartController.js";

import { protect } from "../middlewares/authenticationMiddleware.js";
const router = express.Router();

router.post("/add", protect, addToCart);
router.delete("/remove/:id", protect, removeFromCart);
router.put("/update/:id", protect, updateCartItem);
router.get("/", protect, getCart);

export default router;