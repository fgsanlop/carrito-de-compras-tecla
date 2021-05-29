const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

router.get('/trends', async (req, res) => {
    try {
        let tendencias = await productController.listarTendencias();
        res.send(tendencias);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
})

router.post('/product/register', /*MIDDLEWARE ADMIN*/async (req, res) => {
    let body = req.body;
    try {
        if (Object.keys(body).length == 0)
            throw new Error('Datos vacios')
        let resultado = await productController.registrarProducto(body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})

router.get('/product/all', async (req, res) => {
    try {
        let productos = await productController.listarProductos();
        res.send(productos);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
})

router.get('/product/search/:keyword', async (req, res) => {
    let palabra = req.params.keyword;
    try {
        let productos = await productController.listarProductosPorBusqueda(palabra);
        res.send(productos);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
})

router.get('/product/category/:id', async (req, res) => {
    let categoria = req.params.id;
    try {
        let productos = await productController.listarProductosPorCategoria(categoria);
        res.send(productos);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
})

router.get('/product/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let producto = await productController.listarProducto(id);
        res.send(producto);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
})

router.put('/product/update/:id', /*MIDDLEWARE ADMIN*/async (req,res) => {
    let id = req.params.id;
    let body = req.body;
    try {
        if (Object.keys(body).length == 0)
            throw new Error('Datos vacios');
        let resultado = await productController.modificarProducto(id, body);
        res.status(200).json(resultado);            
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/product/delete/:id', /*MIDDLEWARE ADMIN*/async (req,res) => {
    let id = req.params.id;
    try {
        let resultado = await productController.eliminarProducto(id);
        res.status(200).json(resultado);            
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;