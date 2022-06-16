import express from "express";
import todos from './todos.js';

const router = express.Router();

router.use('/todos', todos)

export default router;