var mysql = require('mysql');
var pool = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME
  });

module.exports.get = function (req, res) {
  res.render('login', { title: 'Logowanie', message: 'Logujemy sie'});
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
          console.dir(rows);
          console.dir(post);
          console.log();
          if(post.username === rows[0].name && post.password === rows[0].password) {
            req.session.user_id = rows.token;
            console.log(req.session.user_id);
            res.redirect('/game');
          }else {
            res.send('Bad user/passw');
          }
        }
      });
    }
  });
}
