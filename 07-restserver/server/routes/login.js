const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require('../model/user');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            // user not found in DB
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password not valid'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            // password of that user is not correct
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password not valid'
                }
            });
        }

        // Generates new token
        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN }); // expires in 30 days

        res.json({
            ok: true,
            user: userDB,
            token: token
        });
    });
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }

}

app.post('/google', async(req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verify(token).catch(e => {
        return res.status(403).json({
            ok: false,
            err: e
        });
    });

    User.findOne({ email: googleUser.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (userDB) {
            // user found in DB. Update google credentials
            let token = jwt.sign({
                user: userDB
            }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

            return res.json({
                ok: true,
                user: userDB,
                token
            });

        } else {
            // user NOT found in DB. Create it
            let user = new User();
            user.name = googleUser.name
            user.email = googleUser.email
            user.img = googleUser.img
            user.google = true;
            user.password = ':)';

            user.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                // Generates new token
                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN }); // expires in 30 days

                res.json({
                    ok: true,
                    user: userDB,
                    token: token
                });

            });

        }

    });
});


module.exports = app;