const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const Example = require("./models/Example");

mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then((self) =>
    console.log(`Connected to the database: "${self.connection.name}"`)
  );

const app = express();
app.use(cors());

app.get("/all", async (req, res) => {
  let allExamples = await Example.find();
  res.json(allExamples);
});

app.post("/search", async (req, res) => {
  const newExample = await Example.create(req.query);
  console.log(newExample);
  res.json(newExample);
});

app.listen(process.env.PORT || 5000);
