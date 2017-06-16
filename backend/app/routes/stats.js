const router = require('express').Router();
const httpUtils = require('../utils/http');
const getRootPath = '/';
const getIdPath = '/:id';

/**
 * Handles GET http requests to @getRootPath 
 */
router.get(getRootPath, function(req, res, next) {

  res.send('GET ' + getRootPath);

});

/**
 * Handles GET http requests to @getIdPath 
 */
router.get(getIdPath, function(req, res, next) {

  res.send('GET ' + getIdPath);

});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(getRootPath, httpUtils.notAllowedHandler);
router.all(getIdPath, httpUtils.notAllowedHandler);

module.exports = router;