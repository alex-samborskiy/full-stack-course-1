import { Todos } from "../models/todoMogo.model.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

class TodoMongoRepository {
  async getById(id, user) {
    const todo = await Todos.findOne({
      $and: [
        { _id: id },
        { $or: [{ owner: user._id }, { sharedWith: user._id }] },
      ],
    });
    if (!todo) {
      throw new HTTPError("NotFound", 404);
    }
    return todo;
  }
  async getAll({ limip = 10, page = 1 }, user) {
    const todos = await Todos.find({
      $or: [{ owner: user._id }, { sharedWith: user._id }],
    })
      .populate({ path: "owner" })
      .populate({ path: "sharedWith" });
    return todos;
  }
  async create(object) {
    logger.info(`TodoRepository. Create todo request`, object);
    const todo = new Todos(object);
    await todo.save();

    return todo.getPublickTodo();
  }
  async deleteOne(id) {
    return todoModel.delete(id);
  }

  async update(id, todo) {
    logger.info(`TodoRepository. Update todo request id=${id}`, { todo });
    return todoModel.update(id, todo);
  }
}

export const todoMongoRepository = new TodoMongoRepository();
