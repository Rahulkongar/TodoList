import React, { useReducer, useState } from "react";
import "./TodoList.css";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload }];
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoList = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo) {
      dispatch({ type: "EDIT", payload: { id: editingTodo, text: newTodo } });
      setEditingTodo(null);
    } else {
      dispatch({ type: "ADD_TODO", payload: newTodo });
    }
    setNewTodo("");
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo.id);
    setNewTodo(todo.text);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <div className="todo-list-container"> 
      <h1>Todo List with useReducer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          {editingTodo ? "Edit" : "Add"}
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <button onClick={() => handleEdit(todo)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(todo.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
