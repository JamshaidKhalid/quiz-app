var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'quizapp'
});

const connectDB = async () => {
    connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected successfully ");
});
}


module.exports = connectDB;