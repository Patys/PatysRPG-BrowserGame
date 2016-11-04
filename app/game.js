var mysql = require('mysql');
var pool = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME
  });

var json_game_data = {
  strength: 5,
  vitality: 4,
  inteligence: 2,
  agility: 666

};

module.exports.get = function (req, res) {
  res.render('game', json_game_data);

}
