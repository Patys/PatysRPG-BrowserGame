module.exports.query = function (query, args, conn, next) {
  conn.query(query, args,function(err, rows) {
    if(err) throw err;
    next(rows);
  });
}
