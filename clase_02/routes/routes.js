const express = require('express');
const router = express.Router()
const {
    nuevoAutor,
    nuevoLibro,
    mostrarAutor,
    MostrarLibro
} = require('../db.js');

