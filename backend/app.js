const app = require('express')();

const stats = require('./app/routes/stats');
const urls = require('./app/routes/urls');
const user = require('./app/routes/user');
const users = require('./app/routes/users');

app.set('port', process.env.PORT || '8080');

app.use('/stats', stats);
app.use('/urls',  urls);
app.use('/user',  user);
app.use('/users', users);

app.listen(app.get('port'));