const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));

//NUNJUCKS
nunjucks.configure(path.resolve(__dirname, "templates"), {
    express: app,
    autoescape: true,
    noCache: true,
    watch: true
})

//Rutas
// app.use(router);
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
let intentos = 0;
app.get('/', async (req, res) => {
    req.session.name = req.body.name;
    console.log(req.session.name);
    intentos++
    res.render('index.html', { random: Math.random().toString(36).substr(2, 24), intentos: intentos })
})

app.post('/reset', async (req, res) => {
    intentos = 0
    res.redirect('/')
})

//Session
app.use(session({ secret: 'aSjfjDWEmsKw' })) // cadena de cifrado

//Port
app.get('*', (req, res) => {
    res.send('Ruta no implementada')
})

app.listen(3000, () => {
    console.log(`Servidor en puerto http://localhost:3000/`);
});
