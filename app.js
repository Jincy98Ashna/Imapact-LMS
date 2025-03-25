require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const initializePassport = require('./config/passport');
const app = express();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/auth', express.static(path.join(__dirname, 'public/auth')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/auth/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/auth/signup.html'));
});


app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: info.message });
        
        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.json({ success: true, redirect: '/dashboard' });
        });
    })(req, res, next);
});

app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, email, password, password2, country, city, phone, occupation } = req.body;
    
    try {
        if (password !== password2) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
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
        res.json({ success: true, redirect: '/login' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating account. Please try again.' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});