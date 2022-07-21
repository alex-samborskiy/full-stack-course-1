import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

import ListItem from "../ListItem";
import CreateItem from "../CreateItem";
import EditItem from "../EditItem";
import FiltersBar from "../Filters";
import Pages from "../Pagination";

import useApi from "../../hooks/useApi";
import useNotifications from "../../hooks/useNotifications";
import { FILTERS } from "../../utils";
import useUserData from "../../hooks/useUserData";

import "./styles.css";

const LIMIT = 10;

const List = () => {
  const api = useApi();
  const userData = useUserData();
  const notifications = useNotifications();

  const [todos, setTodos] = useState({
    data: [],
    total: undefined,
    limit: undefined,
    page: undefined,
  });
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showToast, setShowToast] = useState({ visibility: false, text: "" });
  const [filterType, setFilterType] = useState(FILTERS.ALL);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async (page = 1) => {
    const todos = await api.getAllTodos({ limit: LIMIT, page: page - 1 });
    setTodos(todos);
  };

  const handleCreate = async (todo) => {
    try {
      await api.createTodo({ text: todo });
      notifications.success({ message: "Todo successfully created" });
      getAllTodos();
    } catch (error) {
      console.error(error);
      notifications.error({ message: "Failed to crate todo" });
    }
  };

  const handleEdit = (id) => {
    setSelectedTodo(todos.data.find((todo) => todo.id === id));
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
      const todo = todos.data.find((todo) => todo.id === id);
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
        return todos.data;
      case FILTERS.DONE:
        return todos.data.filter((todo) => todo.isCompleted);
      case FILTERS.TODO:
        return todos.data.filter((todo) => !todo.isCompleted);
      default:
        return todos.data;
    }
  };

  const onChangePage = (page) => {
    if (page === todos.page) return;

    getAllTodos(page);
  };

  const getPagesCount = () => {
    return Math.ceil(todos.total / todos.limit);
  };

  console.log("notifications", notifications);
  return (
    <div className="list">
      {userData && (
        <div className="list__title">
          Welcome {userData.firstName} {userData.lastName}
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
      <Pages
        onChange={onChangePage}
        active={todos.page}
        pages={getPagesCount()}
        maxButtons={3}
      />
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
