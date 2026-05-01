const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const sanitizePayload = (payload = {}) => {
  const nextPayload = {};

  if (payload.title !== undefined) {
    nextPayload.title = String(payload.title).trim();
  }

  if (payload.description !== undefined) {
    nextPayload.description = String(payload.description).trim();
  }

  return nextPayload;
};

const validateTodoPayload = (payload, requireTitle = false) => {
  const errors = [];

  if (requireTitle && !payload.title) {
    errors.push("Task title is required.");
  }

  if (payload.title !== undefined) {
    if (!payload.title) {
      errors.push("Task title is required.");
    } else if (payload.title.length < 3) {
      errors.push("Task title must be at least 3 characters.");
    } else if (payload.title.length > 80) {
      errors.push("Task title must be 80 characters or fewer.");
    }
  }

  if (payload.description !== undefined && payload.description.length > 280) {
    errors.push("Notes must be 280 characters or fewer.");
  }

  return errors;
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Unable to load tasks right now." });
  }
};

// Create todo
exports.createTodo = async (req, res) => {
  try {
    const payload = sanitizePayload(req.body);
    const errors = validateTodoPayload(payload, true);

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const todo = await Todo.create(payload);
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(500).json({ message: "Unable to create task right now." });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task id." });
    }

    const payload = sanitizePayload(req.body);
    const errors = validateTodoPayload(payload, false);

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const updated = await Todo.findByIdAndUpdate(id, payload, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update task right now." });
  }
};

// Toggle done
exports.toggleDone = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task id." });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found." });
    }

    todo.completed = !todo.completed;
    await todo.save();

    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update task status right now." });
  }
};

// Delete
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task id." });
    }

    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.json({ message: "Task deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete task right now." });
  }
};