const express = require('express');
const mongoose = require('mongoose');
// cookie session
const cookieSession = require('cookie-session');

// passport 
const passport = require('passport');

const keys = require('./config/keys');

// models
require('./models/User');
// passport
require('./services/passport');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/authRoutes')(app);

// listening-----------------------------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT);