const router = require('express').Router();
const db = require('../utils/database');
const httpUtils = require('../utils/http');
const encodeUrl = require('encodeurl');
const shortid = require('shortid');

const postRootPath = '/';
const postUserIdUrlsPath = '/:userid/urls';
const getUserIdStatsPath = '/:userId/stats';

/**
 * Handles POST http requests to @postRootPath 
 */
router.post(postRootPath, function(req, res, next) {

	var rawID, encodedID, usersRef, dbRequest;

	if(!req.body || !req.body.id || !req.body.id.trim()){

		res.status(422)
		.send('Parameter ID not present');

		return;
	}

	rawID = req.body.id.trim();
	encodedID = encodeUrl(req.body.id.trim());
	usersRef = db.ref('/Users');

	usersRef.orderByChild("id")
	.equalTo(encodedID)
	.once("value",
		function(snapshot) {
	  
			usersRef.off();

			if(snapshot.exists())

		  		res.status(409).send('User ' + rawID + ' already exists');

			else{

		  		dbRequest = usersRef.push({
	    			id: encodedID 
				});

				res.status(201)
				.json({
					id: encodedID
				});
		  }
		}

	);

});

/**
 * Handles POST http requests to @postUserIdUrlsPath 
 */
router.post(postUserIdUrlsPath, function(req, res, next) {

	var rawUserId = req.params.userid;
	var encodedUserId = encodeUrl(rawUserId);
	var usersRef, urlsRef, url, dbRequest, urlId;

	if(!req.body || !req.body.url || !req.body.url.trim()){

		res.status(422)
		.send('Parameter URL not present');

		return;
	}

	usersRef = db.ref('/Users');
	urlsRef = db.ref('/Urls');
	url = req.body.url.trim();
	
	usersRef.orderByChild("id")
	.equalTo(encodedUserId)
	.once("value",
		function(snapshot) {
	  
			usersRef.off();

			if(snapshot.exists()){

				urlId = shortid.generate();

				var dbRequest = urlsRef.child(urlId).set({
					'hits': 0,
					'url': url,
					'userId': encodedUserId
				});

				res.status(201)
				.json({
					'id': urlId,
					'hits': 0,
					'url': url,
					'shortUrl': 'http://localhost:3000/' + urlId
				});
  				
			}
			else{

		  		res.status(500).send('Invalid UserID');
		  		
		  }
		}

	);

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