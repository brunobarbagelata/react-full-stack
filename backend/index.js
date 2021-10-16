const express = require("express");
const http = require("http");
console.log("something");

const app = express();

app.get("/search", (req, res) => {
  console.log(req.query);
  res.json();
});

app.listen(process.env.PORT || 5000);
