import { todoRepository } from "../repositories/todo.repository.js";
import { todoMongoRepository } from "../repositories/todoMongo.repository.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

class TodoService {
  async createTodo({ text }, user) {
    logger.info(`TodoService. Got create todo request`, { text });
    return todoMongoRepository.create({ text, owner: user._id });
  }

  async getAllTodos({ limit, page }, user) {
    const todos = await todoMongoRepository.getAll({ limit, page }, user);

    return todos.map((todo) => todo.getPublickTodoWithUsers());
  }
  async getById(id, user) {
    logger.info(`TodoService. Get by id request ${id}`);
    const todo = await todoMongoRepository.getById(id, user);
    return todo.getPublickTodoWithUsers();
  }

  async update(id, todo) {
    return todoRepository.update(id, todo);
  }
  async deleteOne(id) {
    return todoRepository.deleteOne(id);
  }
}

export const todoService = new TodoService();
