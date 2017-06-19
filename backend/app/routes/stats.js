const router = require('express').Router();
const httpUtils = require('../utils/http');
const db = require('../utils/database');
const getRootPath = '/';
const getIdPath = '/:id';

/**
 * Handles GET http requests to @getRootPath 
 */
router.get(getRootPath, function(req, res, next) {

    var urlsRef = db.ref('/Urls');
    var urlCount, topUrls;

    urlsRef.once("value", function(snapshot) {

        urlsRef.off();

        urlCount = snapshot.numChildren();

        urlsRef.once("value", function(snapshotUrls){

            var urls = [];
            var hits = 0;
            
            urlsRef.off();

            function compare(a,b) {
                if (a.hits < b.hits)
                    return 1;
                if (a.hits > b.hits)
                    return -1;

                return 0;
            }

            snapshotUrls.forEach(function(url){

                urls.push({
                    id: url.key,
                    hits: url.val().hits,
                    url: url.val().url,
                    shortUrl: 'http://' + req.get('host') + '/' + url.key
                });

                hits = hits + url.val().hits;

            });

            res.json({
                hits: hits,
                urlCount: urlCount,
                topUrls: urls.sort(compare).slice(0,10)
            });
        });

    });

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