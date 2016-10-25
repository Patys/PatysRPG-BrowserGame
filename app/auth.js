
var auth = {
  checkAuth : function(req, res, next) {
      if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
      } else {
        // Moze wywalac, wymusza rerender
        //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
      }
    }
    ////////
};

module.exports.auth = auth;
module.exports.auth.checkAuth = auth.checkAuth;
