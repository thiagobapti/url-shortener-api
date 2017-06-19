module.exports = {

	/**
 	* Handles not defined http verbs to valid REST paths
	 */
    notAllowedHandler:function(req, res, next) {

	  res.status(405).send();

	},

	/**
 	* Handles Firebase errors
	 */
    databaseErrorHandler:function(error, res) {

    	var message = message || (error && error.code) || null;
	  
	  	if(res)
			res.status(500).send(message);

	}

}