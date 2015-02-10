var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var siteMapper = require('sitemap');

var routes = require('./routes/index');

var app = express();

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

//Sitemap generation
var siteMap = siteMapper.createSitemap({
	hostname: 'http://dannyeiden.com',
	cacheTime: 600000,
	urls: [
		{url: '/', changefreq: 'monthly', priority: 1.0},
		{url: '/documents/Danny-Eiden-Resume.pdf', changefreq: 'monthly', priority: 0.9}
	]
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Stylus setup
app.use(stylus.middleware({
    src: __dirname + '/public/stylus',
    dest: __dirname + '/public/css'
}));

app.use(favicon(__dirname + '/public/images/deidenIcon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Route to main page
app.use('/', routes);

//Return sitemap
app.get('/sitemap.xml', function(req, res) {
	siteMap.toXML( function (xml) {
		res.header('Content-Type', 'application/xml');
		res.send( xml );
	});
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
