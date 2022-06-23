import express from "express";
import todos from "./todos.js";
import auth from "./auth.js";

const router = express.Router();

router.use("/todos", todos);
router.use("/auth", auth);

export default router;
