var router = require('express').Router();

router.get('/', function(req, res, next) {

  res.send('GET USER');

});

module.exports = router;