const connectDB = require("../mysqlConnection");
const express = require("express");

// Endpoint to create a new quiz
app.post("/quizzes", (req, res) => {
  const {title, description} = req.body;
  const sql = "INSERT INTO quizzes SET ?";
  connection.query(sql, quiz, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
});
