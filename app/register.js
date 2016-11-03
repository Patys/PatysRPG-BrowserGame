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
  var query = "SELECT users.name, users.password, users.token FROM users";
  //WHERE users.name=" + post.username + " AND users.password=" + post.password + "";
  pool.getConnection(function(err, conn){
    if(err) {
      res.json(err);
      // res.send('Bad user/passw');
    } else {
      conn.query(query, function(err, rows) {
        if(err) {
          res.json(err);
          // res.send('Bad user/passw');
        } else {
          if(post.username === rows[0].name && post.password === rows[0].password) {
            res.send('Uzytkownik istnieje');
          } else {
            var queryInsert = "INSERT INTO users VALUES ('',\""+post.username+"\",\""+post.password+"\",\""+post.email+"\",\""+Date.now()+"\",\""+guid()+"\");";
            conn.query(queryInsert, function(err, rows) {
              if(err) {
                res.json(err);
                // res.send('Bad user/passw');
              } else {
                res.redirect('/login');
              }
            });
          }
        }
      });
    }
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
