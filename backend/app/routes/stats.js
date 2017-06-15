var router = require('express').Router();

router.get('/', function(req, res, next) {

  res.send('GET STATS');

});

module.exports = router;