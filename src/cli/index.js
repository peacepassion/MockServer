/* demo config
{
  "port": 3000,
  "get_user_name": {
    "route_keys": ["user", "name"],
    "response_code": 200,
    "response_file": "get_user_name_response.json"
  },
  "get_user_age": {
    "route_keys": ["user", "age"],
    "response_code": 400,
    "response_file": "get_user_age_response.json"
  }
}*/

var yargs = require('yargs')
var fs = require('fs')
var server = require('../server')

module.exports = function () {
  var argv = yargs.usage('Usage: $0 config')
      .demand(1).argv;

  if (argv._.length !== 1) {
    console.error('must have one config file');
    return;
  }

  fs.readFile(argv._[0], 'utf8', function (err, data) {
    if (err) {
      console.error('read file failed');
      return;
    }

    var cfg = JSON.parse(data);

    var port = cfg.port;
    delete cfg.port;

    server.start(port, cfg);
  })
};

