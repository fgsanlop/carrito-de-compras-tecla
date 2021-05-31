const express = require('express');
const middjwt = require('../midd/midd.jwt');
const router = express.Router();

router.get('/', /*middjwt.loggeado,*/ (req, res) => {
    res.render('login', {error: ''});
});

router.get('/signup', (req, res) => {
    res.render('signup', {error: ''});
});

router.get('/index', middjwt.headerViewUsuario, middjwt.checarToken, (req, res) => {
    res.render('index');
})
 
router.get('/super-carga-chetada', (req, res) => {
    res.render('-carga-productos-ml-');
})

////////////////////////////////////////////

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