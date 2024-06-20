const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const keys = require('./config/keys');
require('./passport');

const app = express();

// Middleware
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.get('/', (req,res)=>{
  res.json(["yes its working"])
})

module.exports = app;
