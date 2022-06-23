import { todoRepository } from "../repositories/todo.repository.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

class TodoService {
  async createTodo({ text }) {
    logger.info(`TodoService. Got create todo request`, { text });
    return todoRepository.create({ text });
  }

  async getAllTodos() {
    return todoRepository.getAll();
  }
  getById(id) {
    logger.info(`TodoService. Get by id request ${id}`);
    return todoRepository.getById(id);
  }

  async update(id, todo) {
    return todoRepository.update(id, todo);
  }
  async deleteOne(id) {
    return todoRepository.deleteOne(id);
  }
}

export const todoService = new TodoService();
