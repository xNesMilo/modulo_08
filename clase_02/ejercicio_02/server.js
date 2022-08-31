//Rutas
const express = require('express');
const nunjucks = require('nunjucks');
const router = require('./rutas/rutas.js');
const path = require('path');

const app = express();

//Middleware (Intermediario entre Front y Back).
app.use(express.urlencoded({extended: true}));

//Modeladores de Templates.
nunjucks.configure(path.resolve(__dirname, "templates"), {
    express: app,
    autoescape: true,
    noCache: true,
    watch: true
})

//Router
app.use(router);
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

// Puerto del server.
app.listen(3000, function(){
    console.log('Server ON');
})