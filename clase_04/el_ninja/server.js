const express = require('express');
const session = require('express-session')
const nunjucks = require('nunjucks');
const path = require('path');

// Rutas
const rutaLogin = require('./routes/routesLogin')
const rutaGame = require('./routes/routesGame')

const app = express();
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/magic.css/dist'))
app.use(session({ secret: 'hmit' }));
app.use(express.static('public'))

// Configuramos formularios
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Se configura nunjucks.
nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});

// Rutas
app.use(rutaLogin)
app.use(rutaGame);

// Ruta por default.
app.get('*', (req, res) => {
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto http://localhost:3000/`);
});
