import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

import ListItem from "../ListItem";
import CreateItem from "../CreateItem";
import EditItem from "../EditItem";
import FiltersBar from "../Filters";
import { useAuth } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { FILTERS } from "../../utils";

import "./styles.css";


const List = () => {
  const auth = useAuth();
  const api = useApi();
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showToast, setShowToast] = useState({ visibility: false, text: "" });
  const [filterType, setFilterType] = useState(FILTERS.ALL);

  useEffect(() => {
    getUser();
    getAllTodos();
  }, []);

  const getUser = async () => {
    const user = await api.me();
    auth.addUser(user);
  };

  const getAllTodos = async () => {
    const todos = await api.getAllTodos();
    setTodos(todos.data);
  };

  const handleCreate = async (todo) => {
    try {
      await api.createTodo({ text: todo });
      getAllTodos();
    } catch (error) {
      console.error(error);
    }
    setShowToast({ visibility: true, text: "Todo successfully created" });
  };

  const handleEdit = (id) => {
    setSelectedTodo(todos.find((todo) => todo.id === id));
  };

  const handleSave = async ({ id, text }) => {
    try {
      await api.updateTodo(id, { text });
      getAllTodos();
      handleClose();
    } catch (error) {
      console.error(error);
      setShowToast({ visibility: true, text: "Failed" });
    }
    setShowToast({ visibility: true, text: "Todo successfully updated" });
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleRemove = async (id) => {
    try {
      await api.deleteTodo(id);
      getAllTodos();
      setShowToast({ visibility: true, text: "Todo successfully removed" });
    } catch (error) {
      console.error(error);
      setShowToast({ visibility: true, text: "Failed" });
    }
  };

  const handleCheck = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      await api.updateTodo(id, { isCompleted: !todo?.isCompleted });
      getAllTodos();
      handleClose();
    } catch (error) {
      console.error(error);
      setShowToast({ visibility: true, text: "Failed" });
    }
    setShowToast({ visibility: true, text: "Todo successfully updated" });
  };

  const filteredTodo = () => {
    switch (filterType) {
      case FILTERS.ALL:
        return todos;
      case FILTERS.DONE:
        return todos.filter((todo) => todo.isCompleted);
      case FILTERS.TODO:
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  };

  return (
    <div className="list">
      {auth.user && (
        <div className="list__title">
          Welcome {auth.user.firstName} {auth.user.lastName}
        </div>
      )}

      <CreateItem handleCreate={handleCreate} />

      <div className="list__title">TodoList</div>
      <FiltersBar
        filterType={filterType}
        todos={todos}
        setFilterType={setFilterType}
      />
      <div className="list__items">
        {filteredTodo().map((todo) => (
          <ListItem
            key={todo.id}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
            handleCheck={handleCheck}
            {...todo}
          />
        ))}
      </div>
      <EditItem
        show={selectedTodo}
        handleClose={handleClose}
        handleSave={handleSave}
        {...selectedTodo}
      />

      <Toast
        onClose={() => setShowToast({ visibility: false, text: "" })}
        show={showToast.visibility}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Todo</strong>
        </Toast.Header>
        <Toast.Body>{showToast.text}</Toast.Body>
      </Toast>
    </div>
  );
};

export default List;
