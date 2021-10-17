const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const app = express();

app.get("/search", (req, res) => {
  const resp = req.query;
  console.log(req.query);
  res.json(resp);
});

app.listen(process.env.PORT || 5000);
