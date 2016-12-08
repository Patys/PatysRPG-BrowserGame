module.exports.query = function (query, args, conn, next) {
  if(args.length !== 0) {
    try {
      conn.query(query, args,function(err, rows) {
        if(err) throw err;
        next(rows);
      });
    }
    catch(err) {
      console.log('Cannot query: \n\n' + err);
      next();
    }
  } else {
    try {
      conn.query(query,function(err, rows) {
        if(err) throw err;
        next(rows);
      });
    }
    catch(err) {
      console.log('Cannot query: \n\n' + err);
      next();
    }
  }
}
