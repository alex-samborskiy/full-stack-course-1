import {todoService} from "../services/todo.service.js";

class TodoController {
    constructor(service) {
        this.service = service;
    }
    async getAllTodos(req, res) {
        const todos = await this.service.getAllTodos();
        res.json(todos);
    }
    // text, isCompleted, id
    async createTodo(req, res) {
        const todo = await this.service.createTodo(req.body);
        res.json(todo);
    }
}

export const todoController = new TodoController(todoService);
// export default new TodoController();