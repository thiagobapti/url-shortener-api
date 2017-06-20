const app = require('express')();
const bodyParser = require('body-parser');

const defaultRoute = require('./app/routes/default');
const statsRoute   = require('./app/routes/stats');
const urlsRoute    = require('./app/routes/urls');
const userRoute    = require('./app/routes/user');
const usersRoute   = require('./app/routes/users');
const otherRoute   = require('./app/routes/other');

app.set('port', process.env.PORT || '8080');

/**
 * Body Parser config
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routing
 */
app.use('/stats', statsRoute);
app.use('/urls',  urlsRoute);
app.use('/user',  userRoute);
app.use('/users', usersRoute);
app.use('/', 	  defaultRoute);
app.use('/*',     otherRoute);

app.listen(app.get('port'));