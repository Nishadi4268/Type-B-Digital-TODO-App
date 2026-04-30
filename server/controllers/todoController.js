const Todo = require("../models/Todo");

// Get all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Create todo
exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description });
  res.status(201).json(todo);
};

// Update todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// Toggle done
exports.toggleDone = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

// Delete
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};