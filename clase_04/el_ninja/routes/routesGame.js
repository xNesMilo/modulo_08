const express = require('express');
const router = express.Router()

router.get('/', async (req, res) => {
  console.log(req.session.user);
  res.render('index.html', { user: req.session.user })
})

router.post('/gold/process_money', async (req, res) => {
  const opcion = req.body.opcion
  let goldGanado = 0
  if (req.session.puntaje == undefined) {
    req.session.puntaje = 0;
  }
  if (req.session.actividades == undefined) {
    req.session.actividades = [];
  }

  // console.log(req.session.puntaje);

  if (opcion == 'farm') {
    goldGanado = Math.floor(Math.random() * (20 - 10) + 10)
    let actividad = {
      lugar: 'Farm',
      puntaje: goldGanado
    }

    req.session.puntaje += goldGanado
    req.session.actividades.unshift(actividad)

  }
  if (opcion == 'cave') {
    goldGanado = Math.floor(Math.random() * (10 - 5) + 5)

    let actividad = {
      lugar: 'Cave',
      puntaje: goldGanado
    }

    req.session.puntaje += goldGanado
    req.session.actividades.unshift(actividad)

  }
  if (opcion == 'house') {
    goldGanado = Math.floor(Math.random() * (5 - 2) + 2)

    let actividad = {
      lugar: 'house',
      puntaje: goldGanado
    }

    req.session.puntaje += goldGanado
    req.session.actividades.unshift(actividad)

  }
  if (opcion == 'casino') {
    goldGanado = Math.floor(Math.random() * (50 - (-50)) + (-50))

    let actividad = {
      lugar: 'Casino',
      puntaje: goldGanado
    }

    req.session.puntaje += goldGanado
    req.session.actividades.unshift(actividad)
  }

  res.redirect('/gold')
})

router.get('/gold', async (req, res) => {
  res.render('index.html', { puntaje: req.session.puntaje, actividades: req.session.actividades })
})

router.get('/reset', async (req, res) => {
  console.log(req.session.puntaje = 0, req.session.actividades = []);
  req.session.puntaje = undefined
  req.session.actividades = []
  res.render('index.html')
})

module.exports = router