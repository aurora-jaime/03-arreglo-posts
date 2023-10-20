const express = require('express')
const bodyParser = require('body-parser')
const port = 4000

let lastId = 3;

const libros = [
    {
        "id": 1,
        "titulo": "Cien Años de Soledad",
        "autor": "Gabriel García Márquez",
        "paginas": 417,
        "disponible": true,
        "fechaPublicacion": new Date("1967-05-30")
    },
    {
        "id": 2,
        "titulo": "1984",
        "autor": "George Orwell",
        "paginas": 328,
        "disponible": false,
        "fechaPublicacion": new Date("1949-06-08")
    },
    {
        "id": 3,
        "titulo": "El Gran Gatsby",
        "autor": "F. Scott Fitzgerald",
        "paginas": 218,
        "disponible": true,
        "fechaPublicacion": new Date("1925-04-10")
    }
]

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended": true}))

app.get('/', (req, res)=>{
    res.send('Bienvenido a la biblioteca virtual')
})

app.get('/libros', (req, res)=>{
    res.send(libros)
})

app.get('/libros/:id', (req, res)=>{
    const idBuscado = parseInt(req.params.id)

    // Buscar y recuperar del arreglo libros el objeto con identificador igual a id
    const libro = libros.find(p => p.id === idBuscado)
    if(!libro) {
        res.status(404)
        return res.json({"message": "Libro no encontrado"})
    }
    res.send(libro)
})

app.delete('/libros/:id', (req, res)=>{
    const idBuscado = parseInt(req.params.id)

    // Buscar y recuperar del arreglo libros el objeto con identificador igual a id
    const indexLibro = libros.findIndex(p => p.id === idBuscado)
    if(indexLibro === -1) {
        return res.status(404).json({"message": "Libro no encontrado"})
    }

    // Eliminar del arreglo el objeto con índice indexLibro
    let deletedLibro = libros.splice(indexLibro, 1)

    res.json(deletedLibro)
})

// Agregar un libro nuevo al final del arreglo
app.post('/libros', (req, res)=>{
    let titulo = req.body.titulo
    let autor = req.body.autor
    let paginas = req.body.paginas
    let disponible = req.body.disponible
    let fechaPublicacion = req.body.fechaPublicacion

    // Quitar espacios en blanco antes y después de la cadena
    if(titulo) titulo = titulo.trim()
    if(autor) autor = autor.trim()
    if(fechaPublicacion) fechaPublicacion = new Date(fechaPublicacion)

    // Verificar que se tenga toda la información
    if(!titulo || !autor || !paginas || disponible === undefined || !fechaPublicacion) {
        return res.status(400).json({"message": "Faltan datos"})
    }

    // Crear objeto del libro nuevo
    let newLibro = {
        "id": ++lastId,
        "titulo": titulo,
        "autor": autor,
        "paginas": paginas,
        "disponible": disponible,
        "fechaPublicacion": fechaPublicacion
    }

    // Agregar nuevo objeto al final del arreglo
    libros.push(newLibro)

    res.status(201).json(newLibro)
})

// Actualizar uno o más campos de un libro existente
app.patch('/libros/:id', (req, res)=>{
    const idBuscado = parseInt(req.params.id)

    // Buscar y recuperar del arreglo libros el objeto con identificador igual a id
    const indexLibro = libros.findIndex(p => p.id === idBuscado)
    if(indexLibro === -1) {
        return res.status(404).json({"message": "Libro no encontrado"})
    }

    // Quitar espacios en blanco antes y después de la cadena
    let titulo = req.body.titulo
    let autor = req.body.autor
    let paginas = req.body.paginas
    let disponible = req.body.disponible
    let fechaPublicacion = req.body.fechaPublicacion

    if(titulo) titulo = titulo.trim()
    if(autor) autor = autor.trim()
    if(fechaPublicacion) fechaPublicacion = new Date(fechaPublicacion)

    // Verificar si todos los campos son undefined
    if(!titulo && !autor && paginas === undefined && disponible === undefined && !fechaPublicacion) {
        return res.status(400).json({"message": "Faltan datos"})
    }

    if(titulo) libros[indexLibro].titulo = titulo
    if(autor) libros[indexLibro].autor = autor
    if(paginas) libros[indexLibro].paginas = paginas
    if(disponible !== undefined) libros[indexLibro].disponible = disponible
    if(fechaPublicacion) libros[indexLibro].fechaPublicacion = fechaPublicacion

    res.json(libros[indexLibro])
}) 

// Ruta no existente
app.use((req, res)=>{
    res.status(404).send('Ruta no encontrada')
})

app.listen(port, ()=>{
    console.log('Servidor escuchando en el puerto ' + port);
})
