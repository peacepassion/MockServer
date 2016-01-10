/**
 * Created by peacepassion on 16/1/10.
 */

var express = require('express');

var router = express.Router();

router.all('*', function (req, res) {
  res.sendStatus(307);
});

module.exports = router;
