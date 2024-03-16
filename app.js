const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoDBSessionStore = require('connect-mongodb-session')(session);

const User = require('./models/User');
const Food = require('./models/Food');
const Order = require('./models/Order');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/food_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize MongoDB Session Store
const sessionStore = new MongoDBSessionStore({
  uri: 'mongodb://0.0.0.0:27017/food_app', // Replace with your MongoDB connection string
  collection: 'sessions',
});

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/food', require('./routes/food'));
app.use('/order', require('./routes/order'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
