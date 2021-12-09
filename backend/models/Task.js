const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: String,
  description: String,
  card: Number,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
