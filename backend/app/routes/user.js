const router = require('express').Router();
const db = require('../utils/database');
const httpUtils = require('../utils/http');
const encodeUrl = require('encodeurl');
const deleteUserIdPath = '/:userId';

/**
 * Handles DELETE http requests to @deleteUserIdPath 
 */
router.delete(deleteUserIdPath, function(req, res, next) {

	var rawUserId = req.params.userId;
	var encodedUserId = encodeUrl(rawUserId.trim());
	var usersRef;

	usersRef = db.ref('/Users');

	usersRef.orderByChild("id")
	.equalTo(encodedUserId)
	.once("value", function(snapshot) {

    	snapshot.ref.remove();

	});

	res.status(204).send();

});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(deleteUserIdPath, httpUtils.notAllowedHandler);

module.exports = router;