var express = require('express');
var app = express();
var session = require('express-session');
var mysql = require('mysql');
var pug = require('pug');
var conndburl = process.env.OPENSHIFT_MYSQL_DB_URL;
var pool = mysql.createPool({
      host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
      user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
      password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
      port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
      database : process.env.OPENSHIFT_APP_NAME
    });

app.set('view engine', 'pug');
app.set('views', './public/views');
app.set('trust proxy', 1);
app.use(session({
  secret: 'bardzo tajne i dkugie haslo',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path    : '/',
    secure: true
  }
}));
///////////////////////
//AUTH TEST
//////////////////////
//  ,
// http://stackoverflow.com/questions/33466249/how-to-make-express-routes-require-authentication-by-default
//TODO ADD AUTH
function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    // Moze wywalac, wymusza rerender
    //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
}

app.get('/game', checkAuth, function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/login', function (req, res) {
  res.render('login', { title: 'Hey', message: 'Hello there!'});
});

app.post('/login', function (req, res) {
  var post = req.body;
  if (post.username === 'john' && post.password === 'johnspassword') {
    req.session.user_id = johns_user_id_here;
    res.redirect('/game');
  } else {
    res.send('Bad user/pass');
  }
});


app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});
/////////////////////////
app.get('/', function (req, res) {
  query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES";
  pool.getConnection(function(err, conn){
    if(err) {
      res.json(err);
    } else {
       conn.query(query, function(err, rows) {
       if(err) {
         res.json(err);
       } else {
          res.json(rows);
       }
     });
    }
  });
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function () {
  console.log('Run');
});
