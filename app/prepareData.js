var db = require('./dbhelper');

module.exports.getMessageCount= function(conn, req, next) {
  var query = 'SELECT id FROM `users` WHERE `token` = ? ';
  db.query(query, [req.session.user_id], conn, function(user) {
    if(user) {
      var queryMessages = 'SELECT COUNT(*) FROM messages WHERE id_to="'+user.id+'" AND state="un"';
      db.query(queryMessages, '', conn, function(messagesData) {
        if(messagesData) {
          var messages_count = {
            messages_count: messagesData
          };
          next(messages_count);
        }
      });
    }
  });
}

module.exports.getDataCharacter = function(conn, req, next) {
    var query = 'SELECT id FROM `users` WHERE `token` = ? ';
    db.query(query, [req.session.user_id], conn, function(user) {
      if(user) {
        var selectUserCharacter = 'SELECT * from characters WHERE `id_user` = ?';
        db.query(selectUserCharacter, [user[0].id], conn, function(character) {
          if(character[0]) {
            var game_data = {
              strength: character[0].strength,
              vitality: character[0].vitality,
              inteligence: character[0].inteligence,
              agility: character[0].agility,
              money: character[0].cash
            };
            next(game_data);
          }
        });
      }
    });
}

module.exports.getDataMissions = function(conn, req, next) {
  var queryMissions = 'SELECT * FROM missions ORDER BY RAND() LIMIT 3'; // to jest wolne :c
  db.query(queryMissions, '', conn, function(missions) {
    if(missions[0]) {
      var game_data = {
        mission_strength: missions[0].strength,
        mission_vitality: missions[0].vitality,
        mission_inteligence: missions[0].inteligence,
        mission_agility: missions[0].agility,
        mission_money: missions[0].money,
        mission_item: missions[0].id_item,
        mission_time: missions[0].time,
        mission_name: missions[0].name,
        mission_description: missions[0].description,
        mission_strength2: missions[1].strength,
        mission_vitality2: missions[1].vitality,
        mission_inteligence2: missions[1].inteligence,
        mission_agility2: missions[1].agility,
        mission_money2: missions[1].money,
        mission_item2: missions[1].id_item,
        mission_time2: missions[1].time,
        mission_name2: missions[1].name,
        mission_description2: missions[1].description,
        mission_strength3: missions[2].strength,
        mission_vitality3: missions[2].vitality,
        mission_inteligence3: missions[2].inteligence,
        mission_agility3: missions[2].agility,
        mission_money3: missions[2].money,
        mission_item3: missions[2].id_item,
        mission_time3: missions[2].time,
        mission_name3: missions[2].name,
        mission_description3: missions[2].description
      };
      next(game_data);
    }
  });
}

module.exports.getDataRanking = function(conn, req, page, next) {
  var queryRanking = 'SELECT characters.strength, characters.vitality, characters.inteligence, characters.agility, users.name FROM characters, users WHERE characters.id_user=users.id LIMIT 10 OFFSET '+(page*10)+'';
  db.query(queryRanking, '', conn, function(rankingData) {
    if(rankingData) {
      var game_data = {
        ranking: rankingData
      };
      next(game_data);
    }
  });
}

module.exports.getDataMessage = function(conn, req, page, next) {
  var query = 'SELECT id FROM `users` WHERE `token` = ? ';
  db.query(query, [req.session.user_id], conn, function(user) {
    if(user) {
      var queryMessages = 'SELECT * FROM messages WHERE id_to="'+user.id+'" LIMIT 10 OFFSET '+(page*10)+'';
      db.query(queryMessages, '', conn, function(messagesData) {
        if(messagesData) {
          var game_data = {
            messages: messagesData
          };
          next(game_data);
        }
      });
    }
  });
}

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
