
var express = require('express');
var router = require('./router');
var logger = require('morgan')


module.exports.start = function (port, cfg) {
  var app = express();

  app.use(logger('tiny'));
  app.use('*', router(cfg));

  var realPort = port || 3000;
  app.listen(realPort, function () {
    console.log('app started at port: ' + realPort);
  });
};
