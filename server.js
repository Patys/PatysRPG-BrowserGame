var express = require('express');
var app = express();
var mysql = require('mysql');
var pug = require('pug');
var conndburl = process.env.OPENSHIFT_MYSQL_DB_URL;
console.log(conndburl);
var pool = mysql.createPool({
      host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
      user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
      password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
      port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
      database : process.env.OPENSHIFT_APP_NAME
    });


app.set('view engine', 'pug');
app.set('views', './public/views')

app.get('/test', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/', function (req, res) {
  query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES";
  pool.getConnection(function(err, conn){
    if(err) {
      res.json(err);
    } else {
       conn.query(query, function(err, rows) {
       if(err) {
         res.json(err);
       } else {
          res.json(rows);
       }
     });
    }
  });
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function () {
  console.log('Example app listening on port 3000!');
});
