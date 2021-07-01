'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UsersModel = require('../models/Users');

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Register',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/signup',
        }
    });
});

router.get('/', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Log In',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/index',
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    const response = await UsersModel.addUser(name, email, hash);
    console.log('post response is: ', response);
    if (response.id) {
        res.redirect('/');
    } else {
        res.status(500).send('ERROR: Please try submitting the form again. ');
    }
});

router.post('/', async(req, res) => {
    const { email, password } = req.body;
    const user = new UsersModel(null, null, email, password);
    const response = await user.login();

    if (!!response.isValid) {
        const { isValid, user_id, name, email } = response;

        req.session.is_logged_in = isValid;
        req.session.user_id = user_id;
        req.session.name = name;
        req.session.email = email;

        res.redirect('/to-do');
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;