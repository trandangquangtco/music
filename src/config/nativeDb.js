const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'grafsound',
  password: 'g32*9hhaW99',
  database: 'grafsound'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;
