var express = require('express');
var productService = require('../services/product.service');
var categoriesService = require('../services/category.service');

var router = express.Router();

router.get('/', (req, res) => {
  res.send('Hola :D');
})

router.get('/trends', async (req, res) => {
    try {
        let product = await productService.obtenerTendencias();
        res.send(product);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

router.get('/product/:id', async (req, res) => {
    try {
        let product = await productService.buscarProducto(req.params.id);
        res.send(product);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

router.get('/search/:keyword', async (req, res) => {
    try {
        let products = await productService.buscarProductos(req.params.keyword);
        res.send(products);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

router.get('/products/:category', async (req, res) => {
    try {
        let products = await productService.buscarProductosPorCategoria(req.params.category);
        res.send(products);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

router.get('/categories', async (req, res) => {
    try {
        let categories = await categoriesService.obtenerCatergorias();
        res.send(categories);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

module.exports = router;