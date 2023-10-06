const express = require('express')
const bodyParser = require('body-parser')
const port = 4000

let lastId = 3;

// Arreglo que simula una base de datos
const posteos = [
    {
        "id": 1,
        "title": "Wikipedia",
        "content": "Wikipedia es una enciclopedia libre, políglota y editada de manera colaborativa. Es administrada por la Fundación Wikimedia, una organización sin ánimo de lucro cuya financiación está basada en donaciones. Sus más de 61 millones de artículos en 333 idiomas han sido redactados en conjunto por voluntarios de todo el mundo, lo que suma más de 3000 millones de ediciones, y permite que cualquier persona pueda sumarse al proyecto para editarlos, a menos que la página se encuentre protegida contra vandalismos para evitar problemas o disputas.",
        "author": "Juan Pérez",
        "date": new Date()
    },
    {
        "id": 2,
        "title": "Node.js",
        "content": "Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web.4​ Fue creado por Ryan Dahl en 2009 y su evolución está apadrinada por la empresa Joyent, que además tiene contratado a Dahl en plantilla.",
        "author": "John Smith",
        "date": new Date()
    },
    {
        "id": 3,
        "title": "Express",
        "content": "Express.js o simplemente Express es un entorno de trabajo para aplicaciones web para el programario Node.js, de código abierto y con licencia MIT. Se utiliza para desarrollar aplicaciones web y APIs. El autor original es TJ Holowaychuk y la primera versión se lanzó el 2010. Express.js forma parte del programario MEAN, juntamente con MongoDB, Angular.js y Node.js",
        "author": "Mary Jane",
        "date": new Date()
    }


]

const app = express()

// Middleware para analizar el cuerpo de la petición
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended": true}))

app.get('/', (req,res)=>{
    res.send('La página principal')
})

app.get('/posts', (req, res)=>{
    res.send(posteos)
})

app.get('/posts/:id', (req, res)=>{
    // console.log(req.params.id);
    const idBuscado = parseInt(req.params.id)

    // Buscar y recuperar del arreglo posteos el objeto con identificador igual a id
    const posteo = posteos.find(p => p.id === idBuscado)
    if(!posteo) {
        res.status(404)
        return res.json({"message": "Not found"})
    }
    res.send(posteo)
})

app.delete('/posts/:id', (req, res)=>{
    // console.log(req.params.id);
    const idBuscado = parseInt(req.params.id)

    // Buscar y recuperar del arreglo posteos el objeto con identificador igual a id
    const indexPosteo = posteos.findIndex(p => p.id === idBuscado)
    if(indexPosteo===-1) {
        return res.status(404).json({"message": "Not found"})
    }

    // Eliminar del arreglo el objeto con índice indexPosteo
    posteos.splice(indexPosteo,1)

    res.json({"message": "Post deleted"})
})

// Agregar un posteo nuevo al final del arreglo
app.post('/posts', (req, res)=>{
    // console.log(req.body.title);
    // console.log(req.body.content);
    // console.log(req.body.author);

    // Quitar espacios en blanco antes y después de la cadena
    let title = req.body.title.trim()
    let content = req.body.content.trim()
    let author = req.body.author.trim()

    // Verificar que se tenga toda la información
    if(!title || !content || !author) {
        return res.status(400).json({"message": "Missing data"})
    }

    // Crear objeto del posteo nuevo
    let newPost = {
        "id": ++lastId, // Incrementar y actualizar el número de identificador
        "title": title,
        "content": content,
        "author": author,
        "date": new Date()
    }

    // Agregar nuevo objeto al final del arreglo
    posteos.push(newPost)

    res.status(201).json(newPost)
})

// Actualizar uno o más campos de un posteo existente
app.patch('/posts/:id',(req,res)=>{
    // console.log(req.params.id);
    const idBuscado = parseInt(req.params.id)

    // Buscar y recuperar del arreglo posteos el objeto con identificador igual a id
    const indexPosteo = posteos.findIndex(p => p.id === idBuscado)
    if(indexPosteo===-1) {
        return res.status(404).json({"message": "Not found"})
    }

    // Quitar espacios en blanco antes y después de la cadena
    let title = req.body.title
    let content = req.body.content
    let author = req.body.author

    if(title) title.trim()
    if(content) content.trim()
    if(author) author.trim()

    console.log(title);
    console.log(content);
    console.log(author);

    // Verificar si todos los campos son undefined
    if(!title && !content && !author) {
        return res.status(400).json({"message": "Missing data"})
    }

    if(title) posteos[indexPosteo].title = title
    if(content) posteos[indexPosteo].content = content
    if(author) posteos[indexPosteo].author = author

    res.json(posteos[indexPosteo])
}) 

// Ruta no existente
app.use((req,res)=>{
    res.send('Not found')
})

app.listen(port, ()=>{
    console.log('Listening for requests on port ' + port);
})
