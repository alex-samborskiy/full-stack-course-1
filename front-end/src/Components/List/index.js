import { useState } from "react";
import { Toast } from "react-bootstrap";

import ListItem from "../ListItem";
import CreateItem from "../CreateItem";
import EditItem from "../EditItem";
import FiltersBar from "../Filters";
import { useAuth } from "../../hooks/useAuth";

import { FILTERS } from "../../utils";

import "./styles.css";

let initialTodos = [
  {
    title: "Lean React",
    isCompleted: false,
    id: 1,
  },
  {
    title: "Lean Angular",
    isCompleted: false,
    id: 2,
  },
  {
    title: "Lean Vue",
    isCompleted: false,
    id: 3,
  },
  {
    title: "Lean Redux",
    isCompleted: false,
    id: 4,
  },
  {
    title: "Lean Node",
    isCompleted: false,
    id: 5,
  },
];

const List = () => {
  const auth = useAuth();
  const [todos, setTodos] = useState(initialTodos);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showToast, setShowToast] = useState({ visibility: false, text: "" });
  const [filterType, setFilterType] = useState(FILTERS.ALL);

  const handleCreate = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { title: todo, id: prevTodos.length + 1 },
    ]);
    setShowToast({ visibility: true, text: "Todo successfully created" });
  };

  const handleEdit = (id) => {
    setSelectedTodo(todos.find((todo) => todo.id === id));
  };

  const handleSave = ({ id, title }) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
    handleClose();
    setShowToast({ visibility: true, text: "Todo successfully updated" });
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setShowToast({ visibility: true, text: "Todo successfully removed" });
  };

  const handleCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
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
        <div className="list__title">Welcome {auth.user.email}</div>
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
