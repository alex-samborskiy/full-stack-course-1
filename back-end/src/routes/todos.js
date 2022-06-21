import express from 'express';
import {todoController} from "../controlers/todo.controller.js";

const router = express.Router();

// get all todos list
router.get('/', todoController.getAllTodos.bind(todoController));

// create new todos
router.post('/', async (req, res) => todoController.createTodo(req, res));

// delete todos by id
router.delete('/:id', async (req, res) => todoController.deleteOne(req, res).catch(next));

// edit todos
router.put('/:id', async (req, res, next) => todoController.update(req, res).catch(next));

router.get('/:id', (req, res, next) => todoController.getById(req, res));

export default router;