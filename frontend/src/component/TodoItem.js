import React from "react";

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const completed = Boolean(todo.completed);

  return (
    <article className={`todo-item${completed ? " todo-item--done" : ""}`}>
      <div className="todo-item__header">
        <div>
          <p className="todo-item__status">{completed ? "Completed" : "In progress"}</p>
          <h3>{todo.title}</h3>
        </div>

        <span className={`status-pill${completed ? " status-pill--done" : ""}`}>
          {completed ? "Done" : "Open"}
        </span>
      </div>

      {todo.description ? (
        <p className="todo-item__description">{todo.description}</p>
      ) : (
        <p className="todo-item__description todo-item__description--empty">
          No description yet.
        </p>
      )}

      <div className="todo-item__actions">
        <button type="button" className="secondary-button" onClick={() => onToggle(todo._id)}>
          {completed ? "Mark as open" : "Mark as done"}
        </button>
        <button type="button" className="text-button" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default TodoItem;