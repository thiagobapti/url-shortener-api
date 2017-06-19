const router = require('express').Router();
const db = require('../utils/database');
const httpUtils = require('../utils/http');
const getIdPath = '/:id';
const deleteIdPath = '/:id';

/**
 * Handles GET http requests to @getIdPath 
 */
router.get(getIdPath, function(req, res, next) {

	var rawUrlId = req.params.id;
	var urlsRef = db.ref('/Urls');

	urlsRef.child(rawUrlId).once("value", function(snapshot) {

        urlsRef.off();

		snapshot.ref.update({hits: snapshot.val().hits + 1});

		return res.redirect(301, snapshot.val().url.substr(0,4) == 'http' ? snapshot.val().url : 'http://' + snapshot.val().url);

    });

});

/**
 * Handles DELETE http requests to @deleteIdPath 
 */
router.delete(deleteIdPath, function(req, res, next) {

	var rawUrlId = req.params.id;
	var urlsRef;

	urlsRef = db.ref('/Urls');

	urlsRef.child(rawUrlId).remove();

	res.status(204).send();

});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(getIdPath, httpUtils.notAllowedHandler);
router.all(deleteIdPath, httpUtils.notAllowedHandler);

module.exports = router;