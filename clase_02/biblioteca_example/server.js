const { urlencoded } = require('express');
const express = require('express');
const nunjucks = require('nunjucks');
const router = require('./routes.js')
const path = require( 'path');
const chokidar = require('chokidar');

//habilitar nuestra aplicacion web
const app = express();
//configuracion de formularios method POST
app.use(express.json())
app.use(express.urlencoded({extended:true})) //middleware

nunjucks.configure(path.resolve(__dirname,"templates"),{
    express: app,
    autoescape: true,
    noCache: true,
    watch:true
});

app.use("/static", express.static("static"));
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/axios/dist'))
const fn = require('./funciones/crud')
// poner una ruta antes del router nos agrega el www.holi.com/api/router
app.use(router)

app.listen(3000, function(){
    console.log(`la ruta es http://localhost:3000`);
})