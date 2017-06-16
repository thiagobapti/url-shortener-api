var firebase = require('firebase');

var ref = firebase.initializeApp({
    databaseURL: 'https://url-shortener-73786.firebaseio.com',
    serviceAccount: './app/assets/url-shortener-73786-firebase-adminsdk-hz6tr-0efbeb9a04.json',
});

module.exports = firebase.database();