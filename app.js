'use strict';
const express = require('express')
	, config = require('config')
	, path = require('path')
	, favicon = require('serve-favicon')
	, ejs = require('ejs')
	, log4js = require('log4js');

log4js.configure(config.get('log4js'));

const logger = log4js.getLogger('express');

const app = express();
app.set('views', path.join(__dirname, 'views'));

app.use(log4js.connectLogger(logger));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
	res.render('index');
});

app.all('*', (req, res) => {
	res.status(404).render('errors/404');
});

app.use((err, req, res, next) => {
	res.status(500).render('errors/500');
});

app.listen(config.get('server.port'));
