import React, { useCallback, useEffect, useState } from "react";
import API from "../api";
import TodoItem from "../component/TodoItem";
import TodoForm from "../component/TodoForm";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getFriendlyMessage = (error, fallbackMessage) => {
    return error?.response?.data?.message || fallbackMessage;
  };

  const fetchTodos = useCallback(async () => {
    try {
      const res = await API.get("/");
      setTodos(res.data);
    } catch (error) {
      setErrorMessage(getFriendlyMessage(error, "Could not load tasks. Please try again."));
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (data) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      await API.post("/", data);
      await fetchTodos();
      setSuccessMessage("Task added successfully.");
      return true;
    } catch (error) {
      setErrorMessage(getFriendlyMessage(error, "Could not add task. Please try again."));
      return false;
    }
  };

  const updateTodo = async (data) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      await API.put(`/${editing._id}`, data);
      setEditing(null);
      await fetchTodos();
      setSuccessMessage("Task updated successfully.");
      return true;
    } catch (error) {
      setErrorMessage(getFriendlyMessage(error, "Could not update task. Please try again."));
      return false;
    }
  };

  const cancelEditing = () => {
    setEditing(null);
    setErrorMessage("");
  };

  const deleteTodo = async (id) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      await API.delete(`/${id}`);
      await fetchTodos();
      setSuccessMessage("Task deleted.");
    } catch (error) {
      setErrorMessage(getFriendlyMessage(error, "Could not delete task. Please try again."));
    }
  };

  const toggleDone = async (id) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      await API.patch(`/${id}/done`);
      await fetchTodos();
      setSuccessMessage("Task status updated.");
    } catch (error) {
      setErrorMessage(getFriendlyMessage(error, "Could not update status. Please try again."));
    }
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app-shell">
      <div className="paper-noise" aria-hidden="true" />

      <main className="todo-app">
        <section className="hero-card">
          <div className="hero-copy">
            <img
              className="hero-icon"
              src={`${process.env.PUBLIC_URL}/icon.webp`}
              alt="Todo app icon"
            />
            <p className="eyebrow">Todo notebook</p>
            <h1>Keep today’s work visible without the clutter.</h1>
            <p className="hero-text">
              Note down what matters, switch between active and finished work, and
              edit things in place when plans change.
            </p>
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <span className="stat-label">Total</span>
              <strong>{todos.length}</strong>
            </article>
            <article className="stat-card">
              <span className="stat-label">Active</span>
              <strong>{activeCount}</strong>
            </article>
            <article className="stat-card">
              <span className="stat-label">Done</span>
              <strong>{completedCount}</strong>
            </article>
          </div>
        </section>

        <section className="workspace-card">
          <div className="card-header">
            <div>
              <p className="section-label">{editing ? "Editing" : "Add a note"}</p>
              <h2>{editing ? "Update this task" : "Write a new task"}</h2>
            </div>

            {editing && (
              <button className="text-button" type="button" onClick={cancelEditing}>
                Cancel edit
              </button>
            )}
          </div>

          {errorMessage && <p className="message-banner message-banner--error">{errorMessage}</p>}
          {!errorMessage && successMessage && (
            <p className="message-banner message-banner--success">{successMessage}</p>
          )}

          <TodoForm
            onSubmit={editing ? updateTodo : createTodo}
            existing={editing}
            onCancel={cancelEditing}
            submissionError={errorMessage}
            onClearError={() => setErrorMessage("")}
          />
        </section>

        <section className="workspace-card list-card">
          <div className="card-header card-header--stacked">
            <div>
              <p className="section-label">Tasks</p>
              <h2>{visibleTodos.length} item{visibleTodos.length === 1 ? "" : "s"} visible</h2>
            </div>

            <div className="filter-tabs" role="tablist" aria-label="Task filters">
              {[
                ["all", "All"],
                ["active", "Active"],
                ["completed", "Completed"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`filter-tab${filter === value ? " filter-tab--active" : ""}`}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {visibleTodos.length > 0 ? (
            <div className="todo-list">
              {visibleTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleDone}
                  onEdit={setEditing}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No tasks in this view</h3>
              <p>
                Try another filter or add something new to get the board moving.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;