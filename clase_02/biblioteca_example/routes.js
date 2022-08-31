const router = require('express').Router()
//const {agregarLibro,mostrarLibro,agregarAutor,mostrarAutor} = require('./funciones/crud')
const fn = require('./funciones/crud')

router.get('/autores', async(req,res)=>{
    const ayuda =  await fn.mostrarAutor()
    let datos = {autores: ayuda }
    res.render('autores.html',datos)
    
})
router.post('/autores', async (req,res)=>{
    const datos =req.body;
    const nombre = datos.nombre;
    const apellido = datos.apellido;
    const note = datos.note;
    await fn.agregarAutor(nombre,apellido,note)
    res.redirect('/autores')
})

router.get('/libros',async (req,res)=>{
    const ayuda =  await fn.mostrarLibro()
    let datos = {libros: ayuda }
    res.render('libros.html', datos)
})

router.post('/libros' , async (req , res)=>{
    const datos =req.body;
    const titulo = datos.titulo;
    const descripcion = datos.descripcion;
    console.log( titulo, descripcion);
    await fn.agregarLibro(titulo,descripcion)
    res.redirect('/libros')
})

module.exports  = router