import React, { useState } from "react";

import "./styles.css";

const CreateListItem = ({ handleCreate }) => {
  const [title, setTitle] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreate(title);
    setTitle("");
  };

  return (
    <div className="create-todo-form">
      <div className="create-todo-form__title">CreateTodo</div>
      <form onSubmit={handleSubmit}>
        <div className="create-todo-form__input-wrapper">
          <label className="create-todo-form__input-label" htmlFor="title">
            Title:
          </label>
          <input
            placeholder="Enter todo"
            className="create-todo-form__input"
            id="title"
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <button
          disabled={!title.length}
          className="create-todo-form__submit-btn"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateListItem;
