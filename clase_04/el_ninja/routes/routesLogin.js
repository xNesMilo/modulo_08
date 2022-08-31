const express = require('express');
const router = express.Router()

const USERS = [
  {
    name: 'Isabel Antolin',
    email: "isabel@gmail.com",
    password: "1234"
  },
  {
    name: 'Monica Cofre',
    email: "monica@gmail.com",
    password: "1234"
  },
  {
    name: 'Sebastian Liberona',
    email: "sebastian@gmail.com",
    password: "1234"
  },
  {
    name: 'Camilo Miranda',
    email: "camilo@gmail.com",
    password: "1234"
  }
]

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // console.log(email,password);
  //_________________________________________________________________________________
  //almaceno en la variable usuario el objeto del array
  //si existe lo almaceno en la variable , si no es undefined
  let usuario
  for (let usr of USERS) {
    if (usr.email == email) {
      usuario = usr; // usuario almacena el objeto con todos sus datos
      break
    }
  }
  //____________________________________________________________________________________________--
  if (!usuario) {
    console.log('Usuario no encontrado');
    return res.redirect('/login')
  }
  //si existe un un email en la base,se debe validar que las clave sea igual a la contraseña guardada
  if (usuario.password != password) {
    console.log('contraseña incorrecta');
    return res.redirect('/login')
  }
  //__________________________________________________________________________________
  console.log('TODO BIEN');
  req.session.user = usuario;
  res.redirect('/')

})
router.get('/login', async (req, res) => {
  res.render('login.html')
})

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login')
})

module.exports = router