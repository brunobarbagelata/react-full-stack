const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const Example = require("./models/Example");

mongoose
  .connect("mongodb://localhost:27017/tasksDB")
  .then((self) =>
    console.log(`Connected to the database: "${self.connection.name}"`)
  );

const app = express();
app.use(cors());
app.use(express.json()); //for req.body

app.get("/alltasks", async (req, res) => {
  let allExamples = await Example.find();
  res.json(allExamples);
});

app.get("/oneexample", async (req, res) => {
  let oneExample = await Example.findById(req.query.exampleId);
  console.log(oneExample);
  res.json(oneExample);
});

app.post("/newtask", async (req, res) => {
  const newExample = await Example.create(req.body);
  console.log(newExample);
  res.json(newExample);
});

app.listen(process.env.PORT || 5000);
