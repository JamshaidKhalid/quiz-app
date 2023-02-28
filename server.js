const express = require("express");
const app = express();
var mysql = require("mysql");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "quizapp",
});

conn = connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected successfully ");
});

//GET /quizzes: Returns a list of all quizzes in the database.
app.get("/quizzes", function (req, res) {
  connection.query("SELECT * FROM quizzes", function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
