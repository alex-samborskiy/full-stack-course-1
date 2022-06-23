import express from "express";
import { todoController } from "../controlers/todo.controller.js";

const router = express.Router();

// get all todos list
router.get("/", async (req, res, next) =>
  todoController.getAllTodos(req, res).catch(next)
);

// create new todos
router.post("/", async (req, res, next) =>
  todoController.createTodo(req, res).catch(next)
);

// delete todos by id
router.delete("/:id", async (req, res, next) =>
  todoController.deleteOne(req, res).catch(next)
);

// edit todos
router.put("/:id", async (req, res, next) =>
  todoController.update(req, res).catch(next)
);

router.get("/:id", (req, res, next) => todoController.getById(req, res));

export default router;
