import { v4 as uuidv4 } from 'uuid';

class TodoModel {
    constructor(dataHolder) {
        this.data = dataHolder;
    }
    async create({text}) {
        const id = uuidv4();
        const date = Date.now();
        this.data.set(id, {id, text, isCompleted: false, createdAt: date, updatedAt: date,});

        return this.data.get(id);
    }

    async getAll() {
        return [...this.data.values()];
    }
}

export const todoModel = new TodoModel(new Map());