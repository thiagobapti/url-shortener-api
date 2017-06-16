var router = require('express').Router();

router.route('*').get(function(req, res) {

    res.status(404).send();

});

module.exports = router;