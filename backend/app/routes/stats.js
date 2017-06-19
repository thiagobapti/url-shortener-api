const router = require('express').Router();
const httpUtils = require('../utils/http');
const db = require('../utils/database');
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

	var rawUrlId = req.params.id;
	var urlsRef = db.ref('/Urls');

	urlsRef.child(rawUrlId).once("value", function(snapshot) {

		var url;

		urlsRef.off();

    	if(snapshot.exists()){

    		url = {
    			id: snapshot.key,
    			hits: snapshot.val().hits,
    			url: snapshot.val().url,
    			shortUrl: 'http://' + req.get('host') + '/' + snapshot.key
    		};

			res.status(200).json(url);

    	} else{

    		res.status(500).send('URL not found');

    	}

	});


});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(getRootPath, httpUtils.notAllowedHandler);
router.all(getIdPath, httpUtils.notAllowedHandler);

module.exports = router;