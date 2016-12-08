var mysql = require('mysql');
var pool = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME
  });
var data = require('./prepareData');

// function getData(req, next) {
//   //WHERE users.name=" + post.username + " AND users.password=" + post.password + "";
//   pool.getConnection(function(err, conn){
//     if(err) throw err;
//     data.get(conn, req, next);
//   });
// }

module.exports.get = function (req, res) {
  try {
    var game_data = {};
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getMessageCount(conn,req, function(messages_count){
        res.render('game', {'messages_count': messages_count, 'game_data': game_data});
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}

module.exports.arena = function (req, res) {
  try {
    var game_data = {};
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getMessageCount(conn,req, function(messages_count){
        game_data.currentUrl = '/arena';
        res.render('game/arena', {'messages_count': messages_count, 'game_data': game_data});
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}

module.exports.character = function (req, res) {
  try {
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getDataCharacter(conn, req, function(game_data) {
        data.getMessageCount(conn,req, function(messages_count){
          game_data.currentUrl = '/character';
          res.render('game/character', {'messages_count': messages_count, 'game_data': game_data});
        });
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}

module.exports.group = function (req, res) {
  try {
    var game_data = {};
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getMessageCount(conn,req, function(messages_count){
        game_data.currentUrl = '/group';
        res.render('game/group', {'messages_count': messages_count, 'game_data': game_data});
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}

module.exports.messages = function (req, res) {
  try {
    var page = req.query.page;
    if(!page)
      page = 1;
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getDataMessage(conn, req, page, function(game_data) {
        data.getMessageCount(conn,req, function(messages_count){
          game_data.currentUrl = '/messages';
          res.render('game/messages', {'messages_count': messages_count, 'game_data': game_data});
        });
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}

module.exports.missions = function (req, res) {
  try {
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getDataMissions(conn, req, function(game_data) {
        data.getMessageCount(conn,req, function(messages_count){
          game_data.currentUrl = '/missions';
          res.render('game/missions', {'messages_count': messages_count, 'game_data': game_data});
        });
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}

module.exports.ranking = function (req, res) {
  try {
    var page = req.query.page;
    if(!page)
      page = 1;
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getDataRanking(conn, req, page, function(game_data) {
        data.getMessageCount(conn,req, function(messages_count){
          game_data.currentUrl = '/ranking';
          res.render('game/ranking', {'messages_count': messages_count, 'game_data': game_data});
        });
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}

module.exports.shop = function (req, res) {
  try {
    var game_data = {};
    pool.getConnection(function(err, conn){
      if(err) throw err;
      data.getMessageCount(conn,req, function(messages_count){
        game_data.currentUrl = '/shop';
        res.render('game/shop', {'messages_count': messages_count, 'game_data': game_data});
      });
    });
  } catch (err) {
    // handle the error safely
    console.log('Cannot get connection: \n\n' + err);
    res.redirect('/error');
  }
}
