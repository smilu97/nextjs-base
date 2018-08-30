const express = require('express');
const app = express.Router();

const UserRouter = require('./user');

app.get('/', (req, res) => {
    res.json({ msg: 'This is api root' });
});

app.use('/user', UserRouter);

module.exports = app;
