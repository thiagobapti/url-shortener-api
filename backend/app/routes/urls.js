const router = require('express').Router();
const httpUtils = require('../utils/http');
const getIdPath = '/:id';
const deleteIdPath = '/:id';

/**
 * Handles GET http requests to @getIdPath 
 */
router.get(getIdPath, function(req, res, next) {

  res.send('GET ' + getIdPath);

});

/**
 * Handles DELETE http requests to @deleteIdPath 
 */
router.delete(deleteIdPath, function(req, res, next) {

  res.send('DELETE ' + deleteIdPath);

});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(getIdPath, httpUtils.notAllowedHandler);
router.all(deleteIdPath, httpUtils.notAllowedHandler);

module.exports = router;