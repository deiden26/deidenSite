const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const stylus = require('stylus');
const siteMapper = require('sitemap');

const routes = require('./routes/index');

const app = express();

const server = app.listen(3000, () => {
    console.log(`Listening on port ${server.address().port}`);
});

// Sitemap generation
const siteMap = siteMapper.createSitemap({
    hostname: 'http://dannyeiden.com',
    cacheTime: 600000,
    urls: [
        {
            url: '/',
            changefreq: 'monthly',
            priority: 1.0,
        },
        {
            url: '/documents/Danny-Eiden-Resume.pdf',
            changefreq: 'monthly',
            priority: 0.9,
        },
    ],
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Stylus setup
app.use(stylus.middleware({
    src: `${__dirname}/public/stylus`,
    dest: `${__dirname}/public/css`,
}));

app.use(favicon(`${__dirname}/public/images/deidenIcon.ico`));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route to main page
app.use('/', routes);

// Return sitemap
app.get('/sitemap.xml', (req, res) => {
    siteMap.toXML((xml) => {
        res.header('Content-Type', 'application/xml');
        res.send( xml );
    });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
});


module.exports = app;
