var express = require('express');
var fs = require('fs')


module.exports = function (cfg) {
  var router = express.Router();

  router.all('*', function (req, res, next) {
    for (var sectionKey in cfg) {
      var section = cfg[sectionKey];
      if (section && checkMatch(req, section.route_keys)) {
        sendFileContent(res, section.response_code, section.response_file);
        return;
      }
    }

    next();
  });

  router.all('*', require('./none_mock_router'));

  return router;
};

function checkMatch(req, routeKeys) {
  var l = routeKeys.length;
  if (l === 0) {
    return false;
  }

  var url = req.originalUrl;

  for (var i = 0; i < l; ++i) {
    if (url.indexOf(routeKeys[i]) === -1) {
      return false;
    }
  }

  return true;
}

function sendFileContent(res, code, file) {
  fs.readFile(file, function (err, data) {
    if (err) {
      var errMsg = 'fail to get data from file: ' + file;
      console.error(errMsg);
      res.status(500).send(errMsg);
      return;
    }

    res.status(code).send(data);
    return;
  });
}
