const router = require('express').Router();
const httpUtils = require('../utils/http');
const deleteUserIdPath = '/:userId';

/**
 * Handles DELETE http requests to @deleteUserIdPath 
 */
router.delete(deleteUserIdPath, function(req, res, next) {

  res.send('DELETE ' + deleteUserIdPath);

});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(deleteUserIdPath, httpUtils.notAllowedHandler);

module.exports = router;