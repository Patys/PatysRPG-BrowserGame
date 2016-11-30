var request = require('request');

module.exports.get = function (req, res) {
    res.render('error');
}

module.exports.post = function (req, res) {
  var post = req.body;
  var date = new Date();
  date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' +
      ('00' + date.getUTCHours()).slice(-2) + ':' +
      ('00' + date.getUTCMinutes()).slice(-2) + ':' +
      ('00' + date.getUTCSeconds()).slice(-2);

  var userData = "Opis: " + post.error + " od: " + post.email + " data: " + data.toString();

  var errorReport = {
   "attachments":[
      {
         "fallback":"New error",
         "pretext":"New error",
         "color":"#D00000",
         "fields":[
            {
               "title":"Błąd",
               "value": userData,
               "short":false
            }
         ]
      }
   ]
 };
  request({
      url: "https://hooks.slack.com/services/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",
      method: "POST",
      json: true,   // <--Very important!!!
      body: errorReport
  }, function (error, response, body){
      console.log(response);
    }
  );
  res.redirect('/thanks');
}
