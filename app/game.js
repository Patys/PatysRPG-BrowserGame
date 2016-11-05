var mysql = require('mysql');
var pool = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME
  });
var db = require('./dbhelper');

function getData(req, next) {
  var query = 'SELECT id FROM `users` WHERE `token` = ? ';
  //WHERE users.name=" + post.username + " AND users.password=" + post.password + "";
  pool.getConnection(function(err, conn){
    if(err) throw err;
    db.query(query, [req.session.user_id], conn, function(result) {
      if(result[0]) {
        var selectStats = 'SELECT * from characters WHERE `id_user` = ?';
        db.query(selectStats, [result[0].id], conn, function(res1) {
          if(res1[0]) {
            var stats = {
              strength: res1[0].strength,
              vitality: res1[0].vitality,
              inteligence: res1[0].inteligence,
              agility: res1[0].agility,
              money: res1[0].cash
            };
            next(stats);
          }
          else {
            console.log('no data');
          }
        });
      } else {
        console.log('wrong token');
      }
    });
  });
}

module.exports.get = function (req, res) {
  getData(req, function(stats) {
    res.render('game', stats);
  });
}
