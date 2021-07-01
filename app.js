'use strict';
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const app = express();
const session = require('express-session')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
const es6renderer = require('express-es6-template-engine');
app.engine('html', es6renderer);
app.set('views', './views');
app.set('view engine', 'html');
app.use(
    session({
        secret: 'sean rools',
        resave: false,
        saveUninitialized: false,
        is_logged_in: false,
    })
);
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`The server is running at http://${hostname}:${port}.`);
});

const rootController = require('./routes/index');
// const toDoController = require('./routes/to-do');

app.use('/', rootController);
// app.use('/to-do', toDoController);