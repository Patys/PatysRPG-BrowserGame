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
            var queryMissions = 'SELECT * FROM missions AS r1 JOIN (SELECT CEIL(RAND() * (SELECT MAX(id) FROM missions)) AS id) AS r2 WHERE r1.id >= r2.id ORDER BY r1.id ASC LIMIT 3';
            db.query(queryMissions, '', conn, function(res2) {
              if(res2[0]) {
                  var game_data = {
                    strength: res1[0].strength,
                    vitality: res1[0].vitality,
                    inteligence: res1[0].inteligence,
                    agility: res1[0].agility,
                    money: res1[0].cash,
                    mission_strength: res2[0].strength,
                    mission_vitality: res2[0].vitality,
                    mission_inteligence: res2[0].inteligence,
                    mission_agility: res2[0].agility,
                    mission_money: res2[0].money,
                    mission_item: res2[0].id_item,
                    mission_time: res2[0].time,
                    mission_name: res2[0].name,
                    mission_description: res2[0].description,
                    mission_strength2: res2[1].strength,
                    mission_vitality2: res2[1].vitality,
                    mission_inteligence2: res2[1].inteligence,
                    mission_agility2: res2[1].agility,
                    mission_money2: res2[1].money,
                    mission_item2: res2[1].id_item,
                    mission_time2: res2[1].time,
                    mission_name2: res2[1].name,
                    mission_description3: res2[1].description,
                    mission_strength3: res2[2].strength,
                    mission_vitality3: res2[2].vitality,
                    mission_inteligence3: res2[2].inteligence,
                    mission_agility3: res2[2].agility,
                    mission_money3: res2[2].money,
                    mission_item3: res2[2].id_item,
                    mission_time3: res2[2].time,
                    mission_name3: res2[2].name,
                    mission_description3: res2[2].description
                  };
                  next(game_data);
              }
            });
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
  getData(req, function(game_data) {
    res.render('game', game_data);
  });
}
