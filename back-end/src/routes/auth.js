import express from "express";
import { register, login } from "../controlers/auth.controller.js";

const router = express.Router();

router.post("/register", async (req, res, next) =>
  register(req, res).catch(next)
);

router.post("/login", async (req, res, next) => login(req, res).catch(next));

export default router;
