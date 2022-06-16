import express from 'express';
import {todoController} from "../controlers/todo.controller.js";

const router = express.Router();

// get all todos list
router.get('/', todoController.getAllTodos);

// create new todos
router.post('/', todoController.createTodo);

// delete todos by id
router.delete('/:id', (req, res) => {
    res.json({
        test: 'API - test'
    });
});

// edit todos
router.post('/:id', (req, res) => {
    res.json({
        test: 'API - test'
    });
});

export default router;