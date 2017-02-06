var express = require('express');
var app = express();
// var mysql = require('mysql');
var pug = require('pug');
var routes = require('./app/routes');
var ExpressPeerServer = require('peer').ExpressPeerServer;
// var conndburl = process.env.OPENSHIFT_MYSQL_DB_URL;
// var pool = mysql.createPool({
//       host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
//       user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
//       password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
//       port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
//       database : process.env.OPENSHIFT_APP_NAME
//     });


app.set('view engine', 'pug');
app.set('views', './public/views');
app.set('trust proxy', 1); // trust no one


app.use('/', routes);



app.use(function(req, res, next){
  res.render('ups');
});


///////////////////////
//AUTH TEST
//////////////////////
//  ,
// http://stackoverflow.com/questions/33466249/how-to-make-express-routes-require-authentication-by-default
//TODO ADD AUTH
// function checkAuth(req, res, next) {
//   console.dir(req.session.user_id);
//   if (!req.session.user_id) {
//     res.send('You are not authorized to viewtest this page');
//   } else {
//     // Moze wywalac, wymusza rerender
//     //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     next();
//   }
// }
//
// app.get('/game', checkAuth, function (req, res) {
//   res.render('index', { title: 'PatysRPG', message: 'Właśnie grasz :D'});
// });
//
// app.get('/login', function (req, res) {
//   res.render('login', { title: 'Logowanie', message: 'Logujemy sie'});
// });
//
// app.post('/login', function (req, res) {
//   var post = req.body;
//   var query = "SELECT users.name, users.password, users.token FROM users";
//   //WHERE users.name=" + post.username + " AND users.password=" + post.password + "";
//   pool.getConnection(function(err, conn){
//     if(err) {
//       res.send('Bad user/passw');
//     } else {
//       conn.query(query, function(err, rows) {
//         if(err) {
//           res.send('Bad user/passw');
//         } else {
//           if(post.username === rows.name && post.password === rows.password) {
//             req.session.user_id = rows.token;
//             res.redirect('/game');
//           }else {
//             res.send('Bad user/passw');
//           }
//         }
//       });
//     }
//   });
// });
//
//
// app.get('/logout', function (req, res) {
//   delete req.session.user_id;
//   res.redirect('/login');
// });
/////////////////////////
// app.get('/', function (req, res) {
//   res.render('index');
//
//   // query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES";
//   // pool.getConnection(function(err, conn){
//   //   if(err) {
//   //     res.json(err);
//   //   } else {
//   //      conn.query(query, function(err, rows) {
//   //      if(err) {
//   //        res.json(err);
//   //      } else {
//   //         res.json(rows);
//   //      }
//   //    });
//   //   }
//   // });
// });

var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function () {
  console.log('Run');
});

/// PEER TO PEER
var options = {
    debug: 3
}

app.use('/p2papi', ExpressPeerServer(server, options));

server.on('connection', function(id) {
  console.log(id);
});


server.on('disconnect', function(id) {
  console.log(id);
});
