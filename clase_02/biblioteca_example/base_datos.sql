create database biblioteca2;

create table autores (
    id serial primary key,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    nota text not null    
)
create table libros (
    id serial primary key,
    titulo varchar(250) not null,
    descripcion text not null
)
create table autor_libro(
    libro_id int references libros(id),
    autor_id int references autores(id),
    primary key (libro_id, autor_id) 
)
    -- foreign key (autor_id) references autores(id)