module.exports.query = function (query, args, conn, next) {
  if(args) {
    conn.query(query, args,function(err, rows) {
      if(err) throw err;
      next(rows);
    });
  } else {
    conn.query(query,function(err, rows) {
      if(err) throw err;
      next(rows);
    });
  }
}
