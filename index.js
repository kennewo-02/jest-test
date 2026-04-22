const express = require("express");
const app = express();
const https = require("https");

function allTodos() {
  return [
    { id: 1, name: "Finished writing a blogpost" },
    { id: 2, name: "Get pizza for dinner" },
    { id: 3, name: "Wake up at 7:30am" }
  ];
}

app.get("/", (req, res) => {
  res.json({
    date: new Date(),
    msg: "Greetings!"
  });
});

// GET ALL TODOS
app.get("/todo", (req, res) => {
  res.json(allTodos());
});

// GET SINGLE TODO
app.get("/todo/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = allTodos().find(t => t.id === todoId);

  res.json(todo);
});

// CHUCK NORRIS JOKE
app.get("/joke", (req, res) => {
  const url = "https://api.chucknorris.io/jokes/random";

  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      res.json(JSON.parse(data));
    });
  });
});

// IMPORTANT: export only (NO app.listen here for tests)
module.exports = app;