import {todoModel} from "../models/todo.model.js";

class TodoService {

    async createTodo({text}) {
        return todoModel.create({text});
    }

    getAllTodos() {
        return todoModel.getAll();
    }
}

export const todoService = new TodoService();