const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard', 
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, password2, country, city, phone, occupation } = req.body;
    
    try {
        
        if (password !== password2) {
            return res.render('signup', { error: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup', { error: 'Email is already registered' });
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            country,
            city,
            phone,
            occupation
        });

        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('signup', { error: 'Error creating account. Please try again.' });
    }
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;