const express = require('express');
const app = express.Router();
const db = require('./db');
const { check, validationResult } = require('express-validator/check');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function encryptPassword(pasw) {
    return crypto.createHash('sha256').update(pasw, 'utf8').digest('base64');
}

async function getUser(req) {
    let auth = '';
    if (req.headers.Authorization !== undefined) {
        auth = req.headers.Authorization;
    } else if (req.headers.authorization !== undefined) {
        auth = req.headers.authorization;
    }
    
    if (auth.length === 0) {
        return;
    }
    
    if (!(auth.startsWith('Bearer '))) {
        return;
    }
    auth = auth.slice(7, auth.length);

    return new Promise((res, rej) => {
        jwt.verify(auth, 's00cc', async (err, decoded) => {
            if (err) {
                return res(undefined);
            }
            const user = await db.User.find({
                where: {
                    id: decoded.userId,
                },
            });
            res(user);
        });
    });
}

function makeToken(id) {
    return jwt.sign({ userId: id }, 's00cc');
}

app.post('/', [
    check('name').exists(),
    check('password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Check name duplication
    const cnt = await db.User.count({
        where: {
            name: req.body.name,
        },
    });
    if (cnt > 0) {
        return res.status(400).json({ msg: 'nameDuplication' });
    }

    const encPassword = encryptPassword(req.body.password);

    const newUser = await db.User.create({
        name: req.body.name,
        encPassword,
    });
    if (newUser) {
        const token = makeToken(newUser.id);
        return res.json({ msg: 'success', user: newUser, token });
    } else {
        return res.status(400).json({ msg: 'failToCreateUser' });
    }
});

app.post('/token', [
    check('name').exists(),
    check('password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const user = await db.User.find({
        where: {
            name: req.body.name,
        },
    });
    if (user === undefined) {
        return res.status(400).json({ msg: 'failToAuth' });
    }
    const encPassword = encryptPassword(req.body.password);
    if (user.encPassword !== encPassword) {
        return res.status(400).json({ msg: 'failToAuth' });
    }

    const token = makeToken(user.id);

    return res.json({ msg: 'success', token });
});

app.get('/', async (req, res) => {
    const user = await getUser(req);
    if (user === undefined) {
        return res.status(400).json({ msg: 'userNotFound' });
    }

    return res.json({ msg: 'success', user });
});

module.exports = app;
