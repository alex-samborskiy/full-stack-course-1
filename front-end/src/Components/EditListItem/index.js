import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import "./styles.css";

const EditListItem = ({ show, id, title, handleClose, handleUpdate }) => {
  const [newTitle, setNewTitle] = useState(title);

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = () => {
    handleUpdate({ title: newTitle, id });
  };

  return (
    <div className="edit-todo-form">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="edit-todo-form__title">CreateTodo</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="edit-todo-form__input-wrapper">
              <label className="edit-todo-form__input-label" htmlFor="title">
                Title:
              </label>
              <input
                placeholder="Enter todo"
                className="edit-todo-form__input"
                id="title"
                type="text"
                value={newTitle}
                onChange={onChangeTitle}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleSubmit}>Save</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditListItem;
