
module.exports.check = function (req, res, next) {
  console.log(req.session.user_id);
  if (!req.session.user_id) {
    res.send('You are not authorized to viewtest this page');
  } else {
    // Moze wywalac, wymusza rerender
    //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
}
