const express = require('express');
const cors = require('cors');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const app = express();

let sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
});

app.use(sessionOptions);

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors(':method :url :status :res[content-length] bytes - :response-time ms'));
app.use(express.static(path.join(__dirname, "static")));


app.get("/.well-known/acme-challenge/:content", function(req, res) {
    let content = req.params.content;
    let static = path.join(__dirname, "static");
    let challenge = path.join(static, ".well-known", "acme-challenge", content);

    res.sendFile(challenge);
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));

module.exports = app;
