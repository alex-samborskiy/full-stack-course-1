import {todoService} from "../services/todo.service.js";
import { logger } from "../utils/logger.js";

class TodoController {
    constructor(service, logger) {
        this.service = service;
        this.log = logger;
    }
    async getAllTodos(req, res) {
        this.log.info('Got getAllTodos request');
        const todos = await this.service.getAllTodos();
        res.json(todos);
    }
    // text, isCompleted, id
    async createTodo(req, res) {
        this.log.info('Got createTodo request');
        const todo = await this.service.createTodo(req.body);
        res.json(todo);
    }
    async deleteOne(req, res) {
        const id = req.params.id;
        this.log.info('Got deleteOne request', {id: `${id}`});
        this.service.deleteOne(id);
        res.json();
    }

    getById(req, res) {
        const id = req.params.id;
        this.log.info('Got getById request', {id: `${id}`});
        const todo = this.service.getById(id);
        this.log.info('Got response from service', {todo});
        
        res.json(todo);
    }

    async update(req, res) {
        const id = req.params.id;
        const todo = req.body;
        this.log.info('Got update request', {id, todo});
        
        const newTodo = await this.service.update(id, todo);
        this.log.info('Got updated todo', {id, newTodo});
        
        res.json(newTodo);
    }
}

export const todoController = new TodoController(todoService, logger);