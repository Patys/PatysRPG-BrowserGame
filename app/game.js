var mysql = require('mysql');
var pool = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME
  });
var data = require('./prepareData');

function getData(req, next) {
  //WHERE users.name=" + post.username + " AND users.password=" + post.password + "";
  pool.getConnection(function(err, conn){
    if(err) throw err;
    data.get(conn, req, next);
  });
}

module.exports.arena = function (req, res) {
  var game_data = {};
  game_data.currentUrl = '/arena';
  res.render('game', game_data);
}

module.exports.character = function (req, res) {
  pool.getConnection(function(err, conn){
    if(err) throw err;
    data.getDataCharacter(conn, req, function(game_data) {
      game_data.currentUrl = '/character';
      res.render('game', game_data);
    });
  });
}

module.exports.group = function (req, res) {
  var game_data = {};
  game_data.currentUrl = '/group';
  res.render('game', game_data);
}

module.exports.messages = function (req, res) {
  var page = req.query.page;
  if(!page)
    page = 0;
  pool.getConnection(function(err, conn){
    if(err) throw err;
    data.getDataMessage(conn, req, page, function(game_data) {
      game_data.currentUrl = '/messages';
      res.render('game', game_data);
    });
  });
}

module.exports.missions = function (req, res) {
  pool.getConnection(function(err, conn){
    if(err) throw err;
    data.getDataMissions(conn, req, function(game_data) {
      game_data.currentUrl = '/missions';
      res.render('game', game_data);
    });
  });
}

module.exports.ranking = function (req, res) {
  var page = req.query.page;
  if(!page)
    page = 0;
  pool.getConnection(function(err, conn){
    if(err) throw err;
    data.getDataRanking(conn, req, page, function(game_data) {
      game_data.currentUrl = '/ranking';
      res.render('game', game_data);
    });
  });
}

module.exports.shop = function (req, res) {
  var game_data = {};
  game_data.currentUrl = '/shop';
  res.render('game', game_data);
}
