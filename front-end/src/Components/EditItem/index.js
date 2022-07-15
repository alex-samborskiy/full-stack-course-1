import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./styles.css";

const EditItem = ({ show, id, text, handleClose, handleSave }) => {
  useEffect(() => {
    setNewText(text);
  }, [text]);

  const [newText, setNewText] = useState("");

  const onChangeText = (e) => {
    setNewText(e.target.value);
  };

  const handleSubmit = () => {
    handleSave({ text: newText, id });
  };

  return (
    <div className="edit-todo-form">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EditTodo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-todo-form__input-wrapper">
            <label className="edit-todo-form__input-label" htmlFor="title">
              Title:
            </label>
            <input
              placeholder="Enter todo"
              className="edit-todo-form__input"
              id="text"
              type="text"
              defaultValue={newText}
              onChange={onChangeText}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="edit-todo-form__btns-wrapper">
            <button
              onClick={handleClose}
              className="edit-todo-form__submit-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="edit-todo-form__submit-btn"
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditItem;
