import express from "express";
import { todoController } from "../controlers/todo.controller.js";
import { authMiddlevare } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get all todos list
router.get("/", authMiddlevare, async (req, res, next) =>
  todoController.getAllTodos(req, res).catch(next)
);

// create new todos
router.post("/", authMiddlevare, async (req, res, next) =>
  todoController.createTodo(req, res).catch(next)
);

// delete todos by id
router.delete("/:id", authMiddlevare, async (req, res, next) =>
  todoController.deleteOne(req, res).catch(next)
);

// edit todos
router.put("/:id", authMiddlevare, async (req, res, next) =>
  todoController.update(req, res).catch(next)
);

router.get("/:id", authMiddlevare, async (req, res, next) =>
  todoController.getById(req, res).catch(next)
);

export default router;
