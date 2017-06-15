var router = require('express').Router();

router.get('/', function(req, res, next) {

  res.send('GET USERS');

});

module.exports = router;