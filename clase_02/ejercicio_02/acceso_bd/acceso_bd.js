const pool = require('./config.js');

//Funcion asincronca para crear autores hacia la base de datos.
async function crear_autor(nombre, apellido, nota) {
    const client = await pool.connect()
    const crearAutor = await client.query({
        text: 'insert into autores(nombre, apellido, nota) values ($1, $2, $3)',
        values: [nombre, apellido, nota]
    })
    console.log('Libro agregado');
    client.release()
} 

//Funcion asincrona para traer autores desde la base al Front.
async function mostrar_autor() {
    const client = await pool.connect()
    const mostrarAutor = await client.query({
        text: 'select * from autores', 
        rowMode: 'object'
    })
    
    client.release()
    return mostrarAutor.rows
}

//Funcion asincrona para crear Libros.
async function crear_libro(titulo, descripcion) {
    const client = await pool.connect()
    const crearLibro = await client.query({
        text: 'insert into libros(titulo, descripcion) values ($1, $2)',
        values: [titulo, descripcion]
    })
    console.log('Libro creado!');
    
    client.release()
} 

//Funcion asincrona para mostrar libros en el Front.
async function mostrar_libro() {
    const client = await pool.connect()
    const mostrarLibro = await client.query({
        text: 'select * from libros', 
        rowMode: 'object'
    })
    client.release()
    return mostrarLibro.rows;
}

//Funcion asincrona para seleccionar Libro
async function libro(id) {
    const client = await pool.connect()
    const libro = await client.query({
        text: 'select * from libros where id=$1',
        values: [id] 
    })
    client.release()
    return libro.rows;
}

//Añadir autores y libros (UNIR)
async function unir(libro_id, autor_id) {
    const client = await pool.connect()
    const unir = await client.query({
        text: 'insert into autor_libro(libro_id, autor_id) values ($1, $2)',
        values: [libro_id, autor_id]
    })
    client.release()
}

//Mostrar union
async function mostrarUnion(id_libro) {
    const client = await pool.connect()
    const mostrar = await client.query({
        text: 'select autores.nombre, autores.apellido, lib.titulo from autores join autor_libro as aut on autores.id=aut.autor_id join libros as lib on lib.id=aut.libro_id where lib.id = $1;',         
        values:[id_libro]
    })
    client.release()
    return mostrar.rows
}

//Modulos exportados 
module.exports = {crear_autor, mostrar_autor, crear_libro, mostrar_libro, libro, unir, mostrarUnion};