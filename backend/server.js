import express from 'express';
import cors from 'cors';
import path from 'path';

import session from 'express-session';
import MongoStore from 'connect-mongo';

import authRoutes from './routes/auth.js';
import recipesRoutes from './routes/recipes.js';
import { handler } from '../frontend/build/handler.js';

import Database from './config/db.js';

import fs from 'fs';
import https from 'https';

import dotenv from 'dotenv';
dotenv.config();

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

const logger = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile(`./logs/${getLogFileName()}`, log + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
};

const errorLogger = (err, req, res, next) => {
    const log = `${new Date().toISOString()} - ERROR: ${err.message}`;
    console.error(log);
    fs.appendFile(`./logs/${getLogFileName()}`, log + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next(err);
};

function getLogFileName() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}.txt`;
}

app.use(logger);
app.use(errorLogger);

app.use(express.static('./static'));


app.get("/.well-known/acme-challenge/:content", function(req, res) {
    let content = req.params.content;
    let _static = './static';
    let challenge = path.join(_static, ".well-known", "acme-challenge", content);

    res.sendFile(challenge);
});

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);

// Define Routes
app.use(handler);

const db = new Database();

// Handle SSL certificates setup

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });

    let certPath = process.env.CERT_PATH || 'aoof.ca.cer';
    let keyPath = process.env.KEY_PATH || 'aoof.ca.key';

    let options = {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath)
    };

    https.createServer(options, app).listen(443, () => {
        console.log('Server started on port 443');
    })
} else {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server started on port ${process.env.PORT || 3000}`);
    });
}

app.on('close', () => {
    db.disconnect();
});

process.on('SIGINT', () => {
    console.log('\nBye bye! - Shutting down database...')
    db.disconnect().then(() => {
        process.exit(0)
    })
});

export default app;