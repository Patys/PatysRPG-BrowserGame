var routes = require('express').Router();

var index = require('./app/index');

routes.get('/', index);

module.exports = routes;
