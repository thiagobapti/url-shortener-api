const router = require('express').Router();
const httpUtils = require('../utils/http');
const postRootPath = '/';
const postUserIdUrlsPath = '/:userid/urls';
const getUserIdStatsPath = '/:userId/stats';

/**
 * Handles POST http requests to @postRootPath 
 */
router.post(postRootPath, function(req, res, next) {

  res.send('POST ' + postRootPath);

});

/**
 * Handles POST http requests to @postUserIdUrlsPath 
 */
router.post(postUserIdUrlsPath, function(req, res, next) {

  res.send('POST ' + postUserIdUrlsPath);

});

/**
 * Handles GET http requests to @getUserIdStatsPath 
 */
router.get(getUserIdStatsPath, function(req, res, next) {

  res.send('GET ' + getUserIdStatsPath);

});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(postRootPath, httpUtils.notAllowedHandler);
router.all(postUserIdUrlsPath, httpUtils.notAllowedHandler);
router.all(getUserIdStatsPath, httpUtils.notAllowedHandler);

module.exports = router;