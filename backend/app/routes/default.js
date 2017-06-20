const router = require('express').Router();
const db = require('../utils/database');
const httpUtils = require('../utils/http');
const getIdPath = '/:id';

/**
 * Handles GET http requests to @getIdPath 
 */
router.get(getIdPath, function(req, res, next) {

	var rawUrlId = req.params.id;
	var urlsRef = db.ref('/Urls');

	urlsRef.child(rawUrlId).once("value", function(snapshot) {

        urlsRef.off();

        if(snapshot.exists()){

			snapshot.ref.update({hits: snapshot.val().hits + 1});

			return res.redirect(301, snapshot.val().url.substr(0,4) == 'http' ? snapshot.val().url : 'http://' + snapshot.val().url);
        
        } else{

        	return res.status(500).send('Url not found');

        }

    });

});

/**
 * Handles any http requests to valid paths with not allowed http verbs(405)
 */
router.all(getIdPath, httpUtils.notAllowedHandler);

module.exports = router;