const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dbConfig=require('./config/couchbase.config');
const couchbaseStore = require('./connector/couchbaseStore');
const DatabaseAdapter=require('./connector/databaseAdapter');
const dbAdapter=new DatabaseAdapter({store:new couchbaseStore(dbConfig)});
const winston = require('./config/winston');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(app.get('port'), function () {
	winston.info('Running sesion');
});
// console.log("app",app);
module.exports.app = app;
module.exports.dbAdapter = dbAdapter;