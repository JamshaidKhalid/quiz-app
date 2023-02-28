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

// POST /quizzes: Creates a new quiz with the provided title and description in the request body.
app.post("/quizzes", function (req, res) {
  const title = req.body.title;
  const description = req.body.description;

  connection.query(
    "INSERT INTO quizzes (title, description) VALUES (?, ?)",
    [title, description],
    function (error, results, fields) {
      if (error) throw error;
      res.send(`Quiz with ID ${results.insertId} has been created.`);
    }
  );
});

//   GET /quizzes/:quizId/questions: Returns a list of questions for the quiz with the provided quizId parameter.
app.get("/quizzes/:quizId/questions", function (req, res) {
  const quizId = req.params.quizId;

  connection.query(
    "SELECT * FROM questions WHERE quiz_id = ?",
    quizId,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

// POST /quizzes/:quizId/questions: Creates a new question for the quiz with the provided quizId parameter, with the question text and is_mandatory flag provided in the request body.
app.post("/quizzes/:quizId/questions", function (req, res) {
  const quizId = req.params.quizId;
  const questionText = req.body.question_text;
  const isMandatory = req.body.is_mandatory || false;

  connection.query(
    "INSERT INTO questions (quiz_id, question_text, is_mandatory) VALUES (?, ?, ?)",
    [quizId, questionText, isMandatory],
    function (error, results, fields) {
      if (error) throw error;
      res.send(
        `Question with ID ${results.insertId} has been created for Quiz with ID ${quizId}.`
      );
    }
  );
});

//GET /questions/:questionId/options: Returns a list of options for the question with the provided questionId parameter.
app.get("/questions/:questionId/options", function (req, res) {
    const questionId = req.params.questionId;
  
    connection.query(
      "SELECT * FROM options WHERE question_id = ?",
      questionId,
      function (error, results, fields) {
        if (error) throw error;
        res.send(results);
      }
    );
  });
  
  // POST /questions/:questionId/options: Creates a new option for the question with the provided questionId parameter, with the option text provided in the request body.
  app.post("/questions/:questionId/options", function (req, res) {
    const questionId = req.params.questionId;
    const optionText = req.body.option_text;
  
    connection.query(
      "INSERT INTO options (question_id, option_text) VALUES (?, ?)",
      [questionId, optionText],
      function (error, results, fields) {
        if (error) throw error;
        res.send(
          `Option with ID ${results.insertId} has been created for Question with ID ${questionId}.`
        );
      }
    );
  });
  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
