const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/', forwardAuthenticated, (req, res) => {
    res.render('index', { user: req.user });
});


router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login', { message: req.flash('error') });
});


router.get('/signup', forwardAuthenticated, (req, res) => {
    res.render('signup');
});

module.exports = router;