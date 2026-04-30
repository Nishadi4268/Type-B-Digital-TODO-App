import React, { useEffect, useState } from "react";

const TodoForm = ({ onSubmit, existing, onCancel }) => {
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");

  useEffect(() => {
    setTitle(existing?.title || "");
    setDescription(existing?.description || "");
  }, [existing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });

    if (!existing) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Task title</span>
        <input
          type="text"
          placeholder="Enter the task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>Notes</span>
        <textarea
          placeholder="Add extra context, checklist items, or the reason this task matters."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
      </label>

      <div className="form-actions">
        {existing && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        )}

        <button type="submit" className="primary-button">
          {existing ? "Update task" : "Add task"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;