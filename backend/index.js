const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

mongoose
  .connect("mongodb://localhost:27017/tasksDB")
  .then((self) =>
    console.log(`Connected to the database: "${self.connection.name}"`)
  );

const app = express();
app.use(cors());
app.use(express.json()); //for req.body

app.get("/all", async (req, res) => {
  let allTasks = await Task.find();
  res.json(allTasks);
});

app.get("/task", async (req, res) => {
  let oneTask = await Task.findById(req.query.taskId);
  res.json(oneTask);
});

app.post("/new", async (req, res) => {
  const newTask = await Task.create(req.body);
  console.log(req.body);
  res.json(newTask);
});

app.post("/edittask", async (req, res) => {
  const taskEdited = await Task.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });

  res.json(taskEdited);
});

app.post("/delete", async (req, res) => {
  const taskEdited = await Task.findByIdAndDelete(req.body.id);
  console.log(req.body.id);
  const newTasks = await Task.find();
  res.json(newTasks);
});

app.listen(process.env.PORT || 5000);
