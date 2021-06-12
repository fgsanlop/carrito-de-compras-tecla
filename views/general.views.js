const express = require('express');
const middjwt = require('../midd/midd.jwt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const datosUsuario = (token) => {
    if (token != undefined) {
        const verified = jwt.verify(token, process.env.SECRET_KEY); 
        if (verified)
            return {
                name: verified.data.name,
                last_name: verified.data.last_name
            } 
        else    
            return false
    }
    else
        return false
}

router.get('/login', middjwt.loggeado, (req, res) => {
    res.render('login');
});

router.get('/signup', middjwt.loggeado, (req, res) => {
    res.render('signup');
});

router.get('/', (req, res) => {
    let datos = datosUsuario(req.cookies.token);
    if(!datos){
        res.render('index')
    }
    else
        res.render('index', {login: {
            name: datos.name,
            last_name: datos.last_name
        }});
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

router.get('/checkout', middjwt.loggeadoCheckOutDatos, (req, res) => {    
    res.render('checkout');
})

router.get('/purchases', middjwt.loggeado, (req, res) => {    
    res.render('purchases');
})

router.get('/user', middjwt.loggeado, (req, res) => {    
    res.render('user');
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