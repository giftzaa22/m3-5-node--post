"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;
const todoList = [];
const app = express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs");
// create endpoints
const todos = (req, res) => {
  console.log("getting");
  res.render("pages/homepage", {
    title: "To do list",
    items: todoList,
  });
};
const newData = (req, res) => {
  const { item } = req.body;
  //const item = req.body.item (object destructuring above)
  // we are establishing that the item is a property we are taking value of and storing.
  //In request/ body/ in body item
  todoList.push(item);
  res.redirect("/");
};
app.get("/", todos);
// create an endpoint called `/data` to receive the data from the form `post
app.post("/form-data", newData);
app.get("*", (req, res) => res.send("Dang. 404."));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));