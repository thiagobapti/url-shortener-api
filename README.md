# URL-SHORTENER-API
A Node + Firebase lightweight url shortener API

# Online Version

[http://syncmob-url-shortener.herokuapp.com/](http://syncmob-url-shortener.herokuapp.com/)

# Dependencies / Installation

* 1 - NodeJS 6.10.x
* 2 - NPM 5.x
* Clone the https://github.com/thiagosyncmob/url-shortener-api.git repository
* Run the `npm install` command inside /backend directory to install all package dependencies
    "body-parser": "^1.17.2"
    "encodeurl": "^1.0.1"
    "express": "4.15.3"
    "firebase": "^4.1.2"
    "shortid": "^2.2.8"
* Run the `npm run start` command inside /backend directory to get the application up and running on port 8080(or process.env.PORT port)

# Endpoints

GET /urls/:id

    http://syncmob-url-shortener.herokuapp.com/urls/:id

POST /users/:userid/urls
	
	http://syncmob-url-shortener.herokuapp.com/users/:userid/urls

GET /stats
	
	http://syncmob-url-shortener.herokuapp.com/stats

GET /users/:userId/stats
	
	http://syncmob-url-shortener.herokuapp.com/users/:userId/stats

GET /stats/:id
	
	http://syncmob-url-shortener.herokuapp.com/stats/:id

DELETE /urls/:id
	
	http://syncmob-url-shortener.herokuapp.com/urls/:id

POST /users
	
	http://syncmob-url-shortener.herokuapp.com/users

DELETE /user/:userId
	
	http://syncmob-url-shortener.herokuapp.com/user/:userId