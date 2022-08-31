const express = require('express');
const nunjucks = require('nunjucks');
const chokidar = require('chokidar');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

nunjucks.configure(path.resolve(__dirname,"templates"), {
    express: app,
    autoescape: true,
    noCache: true,
    watch: true
});

app.use('/static', express.static("static"));
app.use(express.static('node_modules/bootstrap/dist'))
app.use()