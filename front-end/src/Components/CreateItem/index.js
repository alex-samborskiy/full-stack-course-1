import { useState } from "react";
import "./styles.css";

const CreateItem = ({ handleCreate }) => {
  const [text, setText] = useState("");

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreate(text);
    setText("");
  };

  return (
    <div className="create-todo-form">
      <div className="create-todo-form__title">CreateTodo</div>
      <form onSubmit={handleSubmit}>
        <div className="create-todo-form__input-wrapper">
          <label className="create-todo-form__input-label" htmlFor="text">
            Title:
          </label>
          <input
              placeholder="Enter todo"
            className="create-todo-form__input"
            id="text"
            type="text"
            value={text}
            onChange={onChangeText}
          />
        </div>
        <button disabled={!text.length} className="create-todo-form__submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateItem;
