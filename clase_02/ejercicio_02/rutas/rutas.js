const router = require('express').Router();
const func_bd = require('../acceso_bd/acceso_bd.js')

//Ruta a la BD biblioteca
router.get('/biblioteca', (req, res) => {
    res.render('autor.html')
});

//Ruta para mostrar Autor
router.get('/autores', async (req, res) => {
    const informacion = await func_bd.mostrar_autor() //Llamado a la funcion dentro del archivo acceso_bd.js.
    const autores = {autores: informacion}
    //console.log(autores); Verificar que trae AUTORES.
    res.render('index.html', autores )
})

//Ruta para crear el Autor
router.post('/autores', async (req, res)=> {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const comentario = req.body.texto;
    await func_bd.crear_autor(nombre, apellido, comentario)
    res.redirect('/autores')
});

//Ruta para crear nuevo libro
router.post('/new_book.html', async (req, res) => {
    const nuevoLibro = req.query.titulo;
    const descripcion = req.query.descripcion;
    await func_bd.crear_libro(nuevoLibro, descripcion)
    res.redirect('/new_book.html')
}) 

//Ruta para mostrar nuevo libro
router.post('/new_book.html', async (req, res) => {
    const informacion = await func_bd.mostrar_libro() //Llamado a la funcion dentro del archivo acceso_bd.js.
    const libros = {libros: descripcion}
    console.log(libros); //Verificar que trae LIBROS. - AHORA SI TRAE XD
    res.render('new_book.html', libros)
})

//Ruta mostrar libro 
router.get('/libros', async (req, res) => {
    const mostrarLibro = await func_bd.mostrar_libro()
    res.render('libros.html', {libros: mostrarLibro})
})

//Ruta para mostrar titulos y descripcion.
router.post('/libros', async (req, res) => {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    await func_bd.crear_libro(titulo, descripcion)
    res.redirect('/libros')
})

//Ruta para mostrar titulos junto a Autor.
router.get('/libros/:id', async (req, res) => {
    const id = req.params.id
    const libromostrar = await func_bd.libro(id)
    const autores = await func_bd.mostrar_autor()
    const mostrar = await func_bd.mostrarUnion(id)
    res.render('new_book.html', {libros: libromostrar[0], autores: autores, mostrar: mostrar})
})

//Ruta para ver Autor junto a libro.
router.post('/libros/:id', async (req, res) => {
    const id_autor = req.body.select
    const id_libro = req.params.id
    await func_bd.unir(id_libro, id_autor)
    res.redirect(`/libros/${id_libro}`)
})

//Export de modulo ROUTER.
module.exports = router