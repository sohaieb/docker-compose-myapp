// Imports
const app = require('express')();
const chalk = require('chalk');
const ENVS = process.env;
const PORT = ENVS.BACK_PORT || 3001;
const DB_HOST = ENVS.DB_HOST;
const DB_USER = ENVS.DB_USER;
const DB_PASS = ENVS.DB_PASS;
const DB_DATABASE = ENVS.DB_DATABASE;
const mysql = require('mysql2');
const randomstring = require("randomstring");

// Init
const conx = mysql.createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASS,
   database: DB_DATABASE
});


conx.query(`
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255),
    PRIMARY KEY (id)
);
`, (err, result) => {
   conx.query(`
   SELECT * FROM users;
   `, (err, result) => {
      if(err) {
         return console.log(chalk.red(err));
      }
      console.log(result);
   });
   if(err){
      return console.log(chalk.red(err));
   }
   console.log(chalk.greenBright('Table successfully created!'));
});


// Middlewares
app.use((req, res, next) => {
   console.log(chalk.green(`requested: ${req.path}`));
   next();
});

app.get('/get-all', (req,res) => {
   conx.query(`
   SELECT * FROM users;
   `, (err, result) => {
      if(err) {
         return console.log(chalk.red(err));
      }
      res.json(result);
   });
});

app.get('/insert', (req, res) => {
   conx.query(`
   INSERT INTO users(firstname,lastname) 
   VALUES ('${randomstring.generate({
      length: 8,
      charset: 'alphabetic'
   })}', '${randomstring.generate({
      length: 8,
      charset: 'alphabetic'
   })}');
   `, (err, result) => {
      res.send('Insert executed!');
      if(err) {
         return console.log(chalk.red(err));
      }
   });
})

// Start server
app.listen(PORT, () => {
   console.log(chalk.blue(`Backend server started on: ${PORT}`));
})