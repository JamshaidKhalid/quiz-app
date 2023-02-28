const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const port = 3000;
const connection = require('./database/mysqlConnection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

