const { parse } = require('url');
const express = require('express');
const next = require('next');
const db = require('./api/db');

const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const cookie = require('react-cookie');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const api = express();
const app = next({ dev });
const handle = app.getRequestHandler();

api.use(favicon(path.join(__dirname, 'static', 'favicon.png')));
api.use(bodyParser.json());
api.use(cookieParser());

const RootRouter = require('./api');
api.use('/api', RootRouter);

// api.get('/a', (req, res) => {
//     app.render(req, res, '/b', parse(req.url, true).query);
// });

api.get('*', (req, res) => {
    return handle(req, res, parse(req.url, true));
});

app.prepare().then(() => {
    api.listen(3000);
});