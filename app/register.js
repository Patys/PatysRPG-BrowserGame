var mysql = require('mysql');
var pool = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME
  });

module.exports.get = function (req, res) {
  res.render('register');
}

module.exports.post = function (req, res) {
  var post = req.body;
  var query = 'SELECT name, email FROM `users` WHERE `name` = ? OR `email` = ?';
  //WHERE users.name=" + post.username + " AND users.password=" + post.password + "";
  pool.getConnection(function(err, conn){
    if(err) {
      res.json(err);
      // res.send('Bad user/passw');
    } else {
      conn.query(query, [post.username, post.email], function(err, rows) {
        if(err) {
          res.json(err);
          // res.send('Bad user/passw');
        } else {
          if(rows[0]) {
            res.send('Uzytkownik istnieje');
          } else {
            var date;
            date = new Date();
            date = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' +
                ('00' + date.getUTCHours()).slice(-2) + ':' +
                ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                ('00' + date.getUTCSeconds()).slice(-2);
            var queryInsertUser = "INSERT INTO users VALUES ('',\""+post.username+"\",\""+post.password+"\",\""+post.email+"\",\""+date+"\",\""+guid()+"\");";
            insertQuery(queryInsertUser, conn, function(result) {
              var queryInsertCharacter = "INSERT INTO characters VALUES ('',\""+result.insertId+"\",\"5\",\"5\",\"5\",\"5\");";
              insertQuery(queryInsertCharacter, conn, function(res1) {
                res.redirect('/login');
              });
            });

            // conn.query(queryInsertUser, function(err, rows) {
            //   if(err) {
            //     res.json(err);
            //     // res.send('Bad user/passw');
            //   } else {
            //     var queryInsertCharacter = "INSERT INTO characters VALUES ('',\""+rows.insertId+"\",\"5\",\"5\",\"5\",\"5\");";
            //     conn.query(queryInsertCharacter, function(err, rows) {
            //       if(err) {
            //         res.json(err);
            //         // res.send('Bad user/passw');
            //       } else {
            //         res.redirect('/login');
            //       }
            //     });
            //   }
            // });
          }
        }
      });
    }
  });
}

function insertQuery(query, conn, next) {
  conn.query(query, function(err, rows) {
    if(err) throw err;
    next(rows);
  });
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
