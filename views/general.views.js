const express = require('express');
const middjwt = require('../midd/midd.jwt');
const router = express.Router();

router.get('/login', middjwt.loggeado, (req, res) => {
    res.render('login');
});

router.get('/signup', middjwt.loggeado, (req, res) => {
    res.render('signup');
});

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/categories', (req, res) => {
    res.render('categories');
})

router.get('/cart', (req, res) => {
    res.render('cart');
})

router.get('/product', (req, res) => {
    res.render('product');
})

router.get('/search', (req, res) => {
    res.render('search');
})

router.get('/checkout', (req, res) => {    
    res.render('checkout');
})
 
router.get('/super-carga-chetada', (req, res) => {
    res.render('-carga-productos-ml-');
})

/*------------EJS Admin------------*/
router.get('/admin/login', middjwt.loggeadoAdmin, (req, res) => {
    res.render('admin/login')
})
router.get('/admin/index', middjwt.headerViewAdmin, middjwt.checarTokenAdmin, (req, res) => {
    res.render('admin/index')
})
router.get('/admin/product', middjwt.headerViewAdmin, middjwt.checarTokenAdmin, (req, res) => {
    res.render('admin/product')
})
router.get('/admin/product/create', middjwt.headerViewAdmin, middjwt.checarTokenAdmin, (req, res) => {
    res.render('admin/create')
})

module.exports = router;