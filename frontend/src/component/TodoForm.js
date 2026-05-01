import React, { useEffect, useState } from "react";

const TodoForm = ({
  onSubmit,
  existing,
  onCancel,
  submissionError,
  onClearError,
}) => {
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    setTitle(existing?.title || "");
    setDescription(existing?.description || "");
    setFieldErrors({});
  }, [existing]);

  const validate = () => {
    const nextErrors = {};
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) {
      nextErrors.title = "Please enter a task title.";
    } else if (cleanTitle.length < 3) {
      nextErrors.title = "Task title should be at least 3 characters.";
    } else if (cleanTitle.length > 80) {
      nextErrors.title = "Task title must be 80 characters or fewer.";
    }

    if (cleanDescription.length > 280) {
      nextErrors.description = "Notes must be 280 characters or fewer.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const isSuccess = await onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    if (isSuccess && !existing) {
      setTitle("");
      setDescription("");
      setFieldErrors({});
    }
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
    if (fieldErrors.title) {
      setFieldErrors((prev) => ({ ...prev, title: "" }));
    }
    if (submissionError) {
      onClearError();
    }
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (fieldErrors.description) {
      setFieldErrors((prev) => ({ ...prev, description: "" }));
    }
    if (submissionError) {
      onClearError();
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Task title</span>
        <input
          type="text"
          placeholder="Enter the task name"
          value={title}
          onChange={onTitleChange}
          aria-invalid={Boolean(fieldErrors.title)}
          className={fieldErrors.title ? "input-error" : ""}
          required
        />
        {fieldErrors.title && <small className="field-error">{fieldErrors.title}</small>}
      </label>

      <label className="field">
        <span>Notes</span>
        <textarea
          placeholder="Add extra context, checklist items, or the reason this task matters."
          value={description}
          onChange={onDescriptionChange}
          rows="4"
          aria-invalid={Boolean(fieldErrors.description)}
          className={fieldErrors.description ? "input-error" : ""}
        />
        {fieldErrors.description && (
          <small className="field-error">{fieldErrors.description}</small>
        )}
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