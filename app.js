//Importaciones
const express = require('express');
const app = express();
const cors = require('cors');
const midd = require('./midd/midd');
const db = require('./db/db')

require('dotenv').config();

//Middlewares globales
app.use(express.json());
app.use(cors(midd.corsOptions));
app.use(midd.limiter);

app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor: " + err.message)
        }
    }
    next();
})

//Inicio de servidor
app.listen(process.env.PORT, () => {
    console.log(`Server on: http://${process.env.HOST}:${process.env.PORT}`);
})

//Endpoints
app.get('/', (req, res) => {
    res.send('...');
})

app.get('/tendencias', async (req, res) => {
    try {
        let respuesta = await db.obtenerTendencias();
        res.send(respuesta);
    } catch(error) {
        let errorMsg = {
            error: error.message,
            message: 'Error al obtener tendencias'
        }
        res.status(500).send(errorMsg);
    }
})

app.get('/buscar/:palabra', async (req, res) => {
    try {
        let respuesta = await db.buscarProductos(req.params.palabra);
        res.send(respuesta);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

app.get('/producto/:id', async (req, res) => {
    try {
        let respuesta = await db.buscarProducto(req.params.id);
        res.send(respuesta);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

app.get('/categorias', async (req, res) => {
    try {
        let respuesta = await db.obtenerCatergorias();
        res.send(respuesta);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(500).send(errorMsg);
    }
})

app.get('/categoria/:id', async (req, res) => {
    try {
        let respuesta = await db.buscarProductosPorCategoria(req.params.id);
        res.send(respuesta);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})