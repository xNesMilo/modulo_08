const pool = require('./conexion.js')

async function agregarAutor(nombre,apellido,nota){
    const client = await pool.connect()
    const libro =  await client.query({
        text:`insert into autores(nombre,apellido,nota)values($1,$2,$3)`,
        values:[nombre, apellido, nota]
        })
        console.log("libro okey");
        client.release()
    
}
async function mostrarAutor(){
    const client = await pool.connect()
    let datos;
    datos  = await client.query({
        text: "SELECT * from autores",
        rowMode: 'objet'
    })

    /* let libros_datos = libros.rows
    libros_datos = libros_datos.map(data => Object.values(data)); */
    client.release()
    return datos.rows
}

async function agregarLibro(titulo,descripcion){
    const client = await pool.connect()
    const addlibro =  await client.query({
        text:`insert into libros(titulo, descripcion)values($1,$2)`,
        values:[titulo, descripcion]
        })
        console.log("libro okey");
        client.release()
}
async function mostrarLibro(){
    const client = await pool.connect()
    let datos;
    datos  = await client.query({
        text: "SELECT * from libros",
        rowMode: 'objet'
    })
    client.release()
    return datos.rows
}

module.exports = {agregarLibro,mostrarLibro,agregarAutor,mostrarAutor}


