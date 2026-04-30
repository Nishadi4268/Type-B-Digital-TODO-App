import React, { useEffect, useState } from "react";
import API from "../api";
import TodoItem from "../component/TodoItem";
import TodoForm from "../component/TodoForm";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchTodos = async () => {
    const res = await API.get("/");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (data) => {
    await API.post("/", data);
    fetchTodos();
  };

  const updateTodo = async (data) => {
    await API.put(`/${editing._id}`, data);
    setEditing(null);
    fetchTodos();
  };

  const cancelEditing = () => {
    setEditing(null);
  };

  const deleteTodo = async (id) => {
    await API.delete(`/${id}`);
    fetchTodos();
  };

  const toggleDone = async (id) => {
    await API.patch(`/${id}/done`);
    fetchTodos();
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

          <TodoForm
            onSubmit={editing ? updateTodo : createTodo}
            existing={editing}
            onCancel={cancelEditing}
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