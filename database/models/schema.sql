-- CREATE DATABASE quizapp;
-- Create the table for quizzes
CREATE TABLE quizzes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

-- Create the table for questions
CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT NOT NULL,
  question_text TEXT NOT NULL,
  is_mandatory BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Create the table for options
CREATE TABLE options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT NOT NULL,
  option_text TEXT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create the table for quiz submissions
CREATE TABLE quiz_submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT NOT NULL,
  submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Create the table for student answers
CREATE TABLE student_answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_submission_id INT NOT NULL,
  question_id INT NOT NULL,
  option_id INT,
  FOREIGN KEY (quiz_submission_id) REFERENCES quiz_submissions(id),
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (option_id) REFERENCES options(id)
);