import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    text: String,
    isCompleted: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    sharedWith: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    methods: {
      getPublickTodo() {
        const { _id, text, isCompleted, createdAt, updatedAt } = this._doc;
        return { id: _id, text, isCompleted, createdAt, updatedAt };
      },
      getPublickTodoWithUsers() {
        const {
          _id,
          text,
          owner,
          sharedWith,
          isCompleted,
          createdAt,
          updatedAt,
        } = this._doc;
        return {
          id: _id,
          text,
          isCompleted,
          owner: owner.getPublickShortProfile(),
          sharedWith: sharedWith.map((user) => user.getPublickShortProfile()),
          createdAt,
          updatedAt,
        };
      },
    },
  }
);

export const Todos = mongoose.model("Todods", todoSchema);
