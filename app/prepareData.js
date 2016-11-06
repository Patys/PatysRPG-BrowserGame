var db = require('./dbhelper');

module.exports.get = function(conn, req, next) {
  var query = 'SELECT id FROM `users` WHERE `token` = ? ';
  db.query(query, [req.session.user_id], conn, function(result) {
    if(result[0]) {
      var selectStats = 'SELECT * from characters WHERE `id_user` = ?';
      db.query(selectStats, [result[0].id], conn, function(res1) {
        if(res1[0]) {
          var queryMissions = 'SELECT * FROM missions ORDER BY RAND() LIMIT 3'; // to jest wolne :c
          db.query(queryMissions, '', conn, function(res2) {
            if(res2[0]) {
              var queryRanking = 'SELECT characters.strength, characters.vitality, characters.inteligence, characters.agility, users.name FROM characters, users WHERE characters.id_user=users.id';
              db.query(queryRanking, '', conn, function(res3) {
                if(res3) {
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
                    mission_description2: res2[1].description,
                    mission_strength3: res2[2].strength,
                    mission_vitality3: res2[2].vitality,
                    mission_inteligence3: res2[2].inteligence,
                    mission_agility3: res2[2].agility,
                    mission_money3: res2[2].money,
                    mission_item3: res2[2].id_item,
                    mission_time3: res2[2].time,
                    mission_name3: res2[2].name,
                    mission_description3: res2[2].description,
                    ranking: res3
                  };
                  next(game_data);
                }
                else {
                  console.log('no ranking');
                }
              });
            }
            else {
              console.log('no missions');
            }
          });
        }
        else {
          console.log('no character');
        }
      });
    } else {
      console.log('wrong token');
    }
  });
}